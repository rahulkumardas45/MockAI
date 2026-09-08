"use client";

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronsUpDown, 
  Activity, 
  Target,
  Trophy,
  BarChart3,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Share2,
  Copy,
  Lightbulb,
  Check,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);
      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result || []);

      const validRatings = (result || [])
        .map((item) => parseFloat(item.rating))
        .filter((rating) => !isNaN(rating));

      const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
      const avgRating = validRatings.length > 0 
        ? (totalRating / validRatings.length).toFixed(1) 
        : "N/A";

      setAverageRating(avgRating);
    } catch (err) {
      console.error("Error loading feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRatingStatus = (rating) => {
    const num = parseFloat(rating);
    if (isNaN(num)) return { label: "Completed", color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" };
    if (num >= 8) return { label: "Strong Candidate / Ready", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
    if (num >= 6) return { label: "Good Foundation / Near Ready", color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" };
    if (num >= 4) return { label: "Needs Practice", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" };
    return { label: "Needs Substantial Work", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" };
  };

  const copyReportLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Feedback report link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Compiling executive AI performance report...
        </p>
      </div>
    );
  }

  const status = getRatingStatus(averageRating);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Executive Performance Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interview Analytics & Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive diagnostic feedback, comparative model answers, and score breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={copyReportLink}
            className="rounded-xl text-xs font-semibold h-10 border-slate-200 dark:border-white/10"
          >
            {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </Button>

          <Link href={`/dashboard/interview/${params.interviewId}`}>
            <Button className="rounded-xl text-xs font-bold h-10 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20">
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span>Retake Interview</span>
            </Button>
          </Link>
        </div>
      </div>

      {feedbackList.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto">
            <XCircle size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Interview Responses Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            It looks like this interview hasn't been completed yet, or answers were not saved.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              <Button className="rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400">
                Start Interview Now
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-xl text-xs font-semibold">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Scorecard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Overall Score Circle/Box */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl glass-card text-center border-cyan-500/30">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Overall AI Rating
                </span>
                <div className="text-4xl sm:text-5xl font-black gradient-text-ai my-1">
                  {averageRating ? `${averageRating}` : "N/A"}
                  <span className="text-base text-slate-400 font-medium"> / 10</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border mt-2 ${status.bg} ${status.color}`}>
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{status.label}</span>
                </span>
              </div>

              {/* Assessment Breakdown Summary */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Performance Summary
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {feedbackList.length} Question{feedbackList.length > 1 ? 's' : ''} Assessed
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Review the detailed breakdown below to compare your spoken answers with ideal technical responses, recognize your strong points, and target specific gaps for your next round.
                </p>

                {/* Score Level Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Readiness Score</span>
                    <span className="text-cyan-500 font-mono">{averageRating ? `${Math.round((parseFloat(averageRating) / 10) * 100)}%` : "N/A"}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-1000"
                      style={{ width: `${Math.min(100, Math.max(0, (parseFloat(averageRating) || 0) * 10))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Question By Question Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-500" />
                <span>Question-by-Question Deep Dive</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Click to expand & read AI critique
              </span>
            </div>

            {feedbackList.map((item, index) => {
              const ratingNum = parseFloat(item.rating);
              const ratingPill = !isNaN(ratingNum)
                ? ratingNum >= 8
                  ? { color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" }
                  : ratingNum >= 5
                  ? { color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" }
                  : { color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" }
                : { color: "text-slate-400", bg: "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10" };

              return (
                <Collapsible
                  key={index}
                  defaultOpen={index === 0}
                  className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 transition-all"
                >
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between p-5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors gap-4">
                      <div className="flex items-start gap-3.5 flex-grow">
                        <span className="w-7 h-7 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                            {item.question}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ratingPill.bg} ${ratingPill.color}`}>
                          Score: {item.rating}/10
                        </span>
                        <ChevronsUpDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="p-5 pt-0 border-t border-slate-200 dark:border-white/5 space-y-4 mt-2">
                    {/* Comparison Grid: Candidate vs Ideal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {/* Your Answer */}
                      <div className="glass-card rounded-2xl p-4 space-y-2 border-slate-200 dark:border-white/10">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <span>Your Response</span>
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-100/60 dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/5 font-sans">
                          {item.userAns || "No answer provided"}
                        </p>
                      </div>

                      {/* Model Answer */}
                      <div className="glass-card rounded-2xl p-4 space-y-2 border-emerald-500/20 bg-emerald-500/5">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ideal Model Answer</span>
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 font-sans">
                          {item.correctAns || "Review key system concepts and algorithmic complexity."}
                        </p>
                      </div>
                    </div>

                    {/* AI Feedback Box */}
                    <div className="glass-card rounded-2xl p-4 border-cyan-500/20 bg-cyan-500/5 space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>AI Constructive Critique & Actionable Advice</span>
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.feedback}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-xl px-6 h-11 text-xs font-semibold">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>

            <Link href={`/dashboard/interview/${params.interviewId}`}>
              <Button className="rounded-xl px-8 h-11 text-xs font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20">
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                <span>Practice This Role Again</span>
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;