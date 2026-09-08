"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target,
  Clock,
  CheckCircle2,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalInterviews: "0",
    bestScore: "N/A",
    improvementRate: "0%"
  });

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    try {
      const response = await fetch('/api/fetchUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch interview data');
      }
  
      const data = await response.json();
      
      const userSpecificInterviews = (data.userAnswers || []).filter(
        interview => interview.userEmail === user.primaryEmailAddress.emailAddress
      );

      setInterviewData(userSpecificInterviews);

      const total = userSpecificInterviews.length;
      const validRatings = userSpecificInterviews
        .map(item => parseFloat(item.rating || '0'))
        .filter(r => !isNaN(r) && r > 0);

      const best = validRatings.length > 0 ? Math.max(...validRatings) : 0;
      const improvement = calculateImprovementRate(validRatings);

      setStats({
        totalInterviews: total.toString(),
        bestScore: best ? `${best}/10` : 'N/A',
        improvementRate: `${improvement}%`
      });

    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const calculateImprovementRate = (ratings) => {
    if (ratings.length <= 1) return 0;
    const sorted = [...ratings].sort((a, b) => a - b);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (first === 0) return 0;
    const improvement = ((last - first) / first) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="space-y-8 pb-12">
      {/* User Greeting & Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Career Studio Online</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.firstName || 'Candidate'} 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Optimize your resume for ATS screening and practice realistic voice & technical mock interviews.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/resume-analyzer"
              className="px-5 py-3 rounded-2xl glass-card text-slate-700 dark:text-slate-200 hover:text-cyan-500 font-semibold text-sm border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-500" />
              <span>ATS Resume Analyzer</span>
            </Link>

            <button
              onClick={() => setIsNewInterviewModalOpen(true)}
              className="relative group overflow-hidden rounded-2xl p-[1px] font-semibold text-sm transition-transform active:scale-95 shadow-xl shadow-cyan-500/15"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-2xl animate-shimmer" />
              <span className="relative flex items-center gap-2 px-5 py-3 rounded-[15px] bg-[#070B14] text-white transition-colors group-hover:bg-[#070B14]/80">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>New Mock Interview</span>
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Analytics Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
      >
        {/* Card 1 */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 flex-shrink-0">
            <ListChecks size={28} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Total Questions Answered
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.totalInterviews}
            </h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 flex-shrink-0">
            <Trophy size={28} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Best AI Score
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.bestScore}
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 flex-shrink-0">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Confidence & Growth
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.improvementRate}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Resume Analyzer Quick Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="glass-card rounded-3xl p-6 sm:p-7 border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 flex-shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Targeting a specific job position?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-0.5">
              Run your resume through our Semantic RAG ATS Analyzer to discover keyword gaps, rewrite bullet points with STAR metrics, and maximize interview callbacks.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/resume-analyzer"
          className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all flex-shrink-0"
        >
          <span>Evaluate Resume</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Quick Launch & Create Trigger */}
      <AddNewInterview 
        isOpen={isNewInterviewModalOpen} 
        onClose={() => setIsNewInterviewModalOpen(false)} 
      />

      {/* Previous Interviews List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <InterviewList />
      </motion.div>
    </div>
  );
}

export default Dashboard;