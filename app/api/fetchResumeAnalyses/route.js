import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ResumeAnalysis } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    let userEmail = "";
    try {
      const body = await request.json();
      userEmail = body.userEmail;
    } catch (e) {
      // empty body
    }

    if (!userEmail) {
      return NextResponse.json({ analyses: [] }, { status: 200 });
    }

    const analyses = await db
      .select()
      .from(ResumeAnalysis)
      .where(eq(ResumeAnalysis.userEmail, userEmail))
      .orderBy(desc(ResumeAnalysis.id));

    return NextResponse.json(
      {
        analyses: (analyses || []).map((item) => {
          let parsedResult = {};
          try {
            parsedResult = typeof item.analysisResult === "string" 
              ? JSON.parse(item.analysisResult) 
              : item.analysisResult;
          } catch (e) {
            parsedResult = {};
          }
          return {
            ...item,
            analysisResult: parsedResult,
          };
        }),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Fetch resume analyses error:", err);
    // Return empty list safely if table doesn't exist yet or connection blip
    return NextResponse.json(
      { message: "Could not fetch analyses", error: err.message, analyses: [] },
      { status: 200 }
    );
  }
}
