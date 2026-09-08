"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        let jsonMockResp;
        try {
          jsonMockResp = JSON.parse(result[0].jsonMockResp);
        } catch (e) {
          jsonMockResp = {};
        }

        const questions = 
          jsonMockResp.interview_questions || 
          jsonMockResp.questions || 
          (Array.isArray(jsonMockResp) ? jsonMockResp : []);

        setMockInterviewQuestion(questions);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSave = (answerRecord) => {
    if (activeQuestionIndex < (mockInterviewQuestion?.length || 0) - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[65vh] space-y-4">
        <div className="w-14 h-14 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading live AI practice studio...</p>
      </div>
    );
  }

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center max-w-md mx-auto my-12 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Interview Questions Found</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We could not load the question bank for this session.
        </p>
        <Link href="/dashboard">
          <Button className="rounded-xl">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const progressPercentage = Math.round(((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100);

  return (
    <div className="space-y-6 pb-16">
      {/* Studio Header & Progress Bar */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/interview/${params.interviewId}`}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Back to briefing"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">
                Live AI Session
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {interViewData?.jobPosition}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-mono">
              {progressPercentage}% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Question Panel (6 cols) */}
        <div className="lg:col-span-6">
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            onSelectIndex={(index) => setActiveQuestionIndex(index)}
          />
        </div>

        {/* Audio/Video Recording Console (6 cols) */}
        <div className="lg:col-span-6">
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interViewData}
            onAnswerSave={handleAnswerSave}
          />
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          {activeQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="rounded-xl text-xs font-semibold h-10 border-slate-200 dark:border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Previous Question
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeQuestionIndex < mockInterviewQuestion.length - 1 ? (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="rounded-xl text-xs font-bold px-5 h-10 bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900"
            >
              <span>Skip / Next Question</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          ) : (
            <Link href={`/dashboard/interview/${interViewData?.mockId}/feedback`}>
              <Button className="rounded-xl text-xs font-bold px-6 h-10 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-lg shadow-emerald-500/20 hover:opacity-95">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                <span>End Interview & View Analytics</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
