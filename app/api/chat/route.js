import { NextResponse } from "next/server";
import { generateAIContent } from "@/utils/GeminiAIModal";

export const dynamic = "force-dynamic";

const SYSTEM_INSTRUCTION = `You are "Mock AI Assistant", the intelligent AI assistant embedded into the "Mock AI" platform (an AI-powered Resume Analyzer & Mock Interview platform).

Your responsibilities:
1. Platform Guide: Guide users through Mock AI features:
   - AI Mock Interviews: Practice technical and behavioral interviews with real-time speech assessment, live camera/mic feedback, question banks, and actionable scoring.
   - AI Resume Analyzer: Upload PDF resumes for ATS score evaluation, skill gap analysis, bullet point enhancements, and job description matching.
   - Dashboard: Review past interview scores, feedback, and resume audits.
2. Career & Technical Advisor: Answer any interview, career, resume, coding (JavaScript, Python, React, Data Structures, etc.), and HR question the user asks.
3. General Assistant: Help answer general questions politely and concisely.
4. Tone & Language: Be encouraging, professional, and clear. Format answers nicely with short bullet points or markdown when appropriate. If the user writes in Hindi or Hinglish, reply naturally in Hinglish/Hindi as well. Keep answers concise unless detailed depth is asked for.`;

export async function POST(req) {
  try {
    const { messages, userMessage } = await req.json();

    if (!userMessage && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    // Build chat history context (take up to the last 10 messages for context)
    let historyContext = "";
    if (Array.isArray(messages) && messages.length > 0) {
      const recentMessages = messages.slice(-10);
      historyContext = recentMessages
        .map((m) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`)
        .join("\n");
    }

    const latestText = userMessage || messages[messages.length - 1]?.text || "";

    const prompt = `${SYSTEM_INSTRUCTION}

---
Chat History:
${historyContext}
User: ${latestText}

Assistant:`;

    const aiResponse = await generateAIContent(prompt, {
      temperature: 0.7,
      maxOutputTokens: 1024,
    });

    return NextResponse.json({
      reply: aiResponse || "Hi 👋 I’m your AI Career Assistant.How can I assist you Today",
    });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate AI response. Please try again.",
      },
      { status: 500 }
    );
  }
}
