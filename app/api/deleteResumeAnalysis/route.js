import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ResumeAnalysis } from "@/utils/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { id, resumeId, userEmail } = await request.json();

    if (!id && !resumeId) {
      return NextResponse.json(
        { error: "Missing analysis identifier (id or resumeId)." },
        { status: 400 }
      );
    }

    if (id) {
      await db.delete(ResumeAnalysis).where(eq(ResumeAnalysis.id, id));
    } else if (resumeId) {
      await db.delete(ResumeAnalysis).where(eq(ResumeAnalysis.resumeId, resumeId));
    }

    return NextResponse.json(
      { success: true, message: "Analysis deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete resume analysis error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete analysis." },
      { status: 500 }
    );
  }
}
