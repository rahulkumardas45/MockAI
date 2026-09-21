import { NextResponse } from "next/server";
import { analyzeResumeWithRAG } from "@/utils/ragAnalyzer";
import { db } from "@/utils/db";
import { ResumeAnalysis } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const dynamic = "force-dynamic";

/**
 * Extract text from PDF buffer using pdf-parse v2 (with fallback)
 */
async function extractPDF(buffer) {
  try {
    const pdfModule = await import("pdf-parse");
    const PDFClass = pdfModule.PDFParse || pdfModule.default?.PDFParse;
    
    if (PDFClass) {
      const parser = new PDFClass({ data: buffer });
      const result = await parser.getText();
      if (typeof parser.destroy === "function") {
        try {
          await parser.destroy();
        } catch (_) {}
      }
      const text = result?.text || "";
      if (!text.trim()) {
        throw new Error("PDF contains no selectable text (may be an image or scanned document).");
      }
      return text;
    } else if (typeof pdfModule.default === "function") {
      const data = await pdfModule.default(buffer);
      const text = data?.text || "";
      if (!text.trim()) {
        throw new Error("PDF contains no selectable text (may be an image or scanned document).");
      }
      return text;
    } else {
      throw new Error("PDF parser class not found in module.");
    }
  } catch (err) {
    console.error("PDF parse error:", err?.message || err);
    throw new Error(
      err.message ||
      "Could not extract text from the PDF. Make sure it is a text-based PDF (not a scanned image or protected) or paste the resume text directly."
    );
  }
}

/**
 * Extract text from DOCX buffer using mammoth
 */
async function extractDOCX(buffer) {
  try {
    const mammothModule = await import("mammoth");
    const mammoth = mammothModule.default || mammothModule;
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  } catch (err) {
    console.error("DOCX parse error:", err);
    throw new Error("Could not extract text from the Word document (.docx).");
  }
}

export async function POST(req) {
  try {
    // Parse multipart form data
    let formData;
    try {
      formData = await req.formData();
    } catch (formErr) {
      return NextResponse.json(
        { error: "Invalid form data. Please upload a valid file or paste resume text." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const rawResumeText = formData.get("resumeText") || "";
    const jobTitle = formData.get("jobTitle") || "Software Engineer";
    const jobDescription = formData.get("jobDescription") || "";
    const userEmail = formData.get("userEmail") || "guest@mockai.live";

    // Validate job description
    if (!jobDescription || jobDescription.trim().length < 10) {
      return NextResponse.json(
        {
          error: "Please provide a valid Job Description with at least 10 characters.",
        },
        { status: 400 }
      );
    }

    let extractedText = typeof rawResumeText === "string" ? rawResumeText.trim() : "";
    let fileName = "pasted_resume.txt";

    // Process uploaded file if present
    if (file && typeof file === "object" && file.size > 0) {
      fileName = file.name || "uploaded_resume";
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const nameLower = fileName.toLowerCase();

      if (nameLower.endsWith(".pdf")) {
        extractedText = await extractPDF(buffer);
      } else if (nameLower.endsWith(".docx")) {
        extractedText = await extractDOCX(buffer);
      } else {
        // TXT / MD / plain text
        extractedText = buffer.toString("utf-8");
      }
    }

    // Validate extracted text length
    if (!extractedText || extractedText.trim().length < 25) {
      return NextResponse.json(
        {
          error:
            "Resume text is too short or could not be extracted. Please paste your resume text or upload a text-based PDF/DOCX.",
        },
        { status: 400 }
      );
    }

    // Run RAG & Gemini ATS analysis
    let analysis;
    try {
      analysis = await analyzeResumeWithRAG({
        resumeText: extractedText,
        jobTitle,
        jobDescription,
      });
    } catch (aiErr) {
      console.error("AI analysis error:", aiErr);
      return NextResponse.json(
        {
          error:
            "AI analysis failed: " +
            (aiErr.message || "Gemini API error. Please verify your API key and try again."),
        },
        { status: 500 }
      );
    }

    const resumeId = uuidv4();
    const atsScore = String(analysis.ats_score ?? 75);

    // Persist in DB (non-blocking — don't fail the request if DB has issues)
    try {
      await db.insert(ResumeAnalysis).values({
        resumeId,
        userEmail,
        jobTitle,
        jobDescription,
        resumeFileName: fileName,
        resumeRawText: extractedText.substring(0, 15000),
        atsScore,
        analysisResult: JSON.stringify(analysis),
        createdAt: moment().format("DD-MM-YYYY HH:mm"),
      });
    } catch (dbErr) {
      console.warn("DB insert warning (result still returned):", dbErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        resumeId,
        jobTitle,
        fileName,
        atsScore,
        analysis,
        createdAt: moment().format("DD-MM-YYYY HH:mm"),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analyze resume unexpected error:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "An unexpected server error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
