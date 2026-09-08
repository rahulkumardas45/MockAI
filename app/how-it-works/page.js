"use client";

import React from "react";
import { 
  Bot, 
  UserCheck, 
  Sliders, 
  Play, 
  Mic, 
  BarChart3, 
  Repeat, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const HowItWorksPage = () => {
  const steps = [
    {
      step: "01",
      icon: <UserCheck size={28} className="text-cyan-500" />,
      title: "Sign Up & Profile Setup",
      description: "Sign in seamlessly via Clerk. Your interview attempts, speech logs, and scoring trajectory are preserved in your secure dashboard."
    },
    {
      step: "02",
      icon: <Sliders size={28} className="text-indigo-500" />,
      title: "Configure Role & Tech Stack",
      description: "Specify your desired role (e.g. Frontend, Full Stack, AI/ML), key frameworks, and seniority level (Junior, Mid, Senior, Lead)."
    },
    {
      step: "03",
      icon: <Cpu size={28} className="text-purple-500" />,
      title: "Gemini AI Question Generation",
      description: "Our Gemini engine dynamically crafts 5 context-rich technical & situational questions tailored precisely to your inputs."
    },
    {
      step: "04",
      icon: <Mic size={28} className="text-pink-500" />,
      title: "Spoken Response & Speech-to-Text",
      description: "Speak your answers naturally using your microphone. Our browser STT model transcribes your voice in real-time with visual waveforms."
    },
    {
      step: "05",
      icon: <BarChart3 size={28} className="text-emerald-500" />,
      title: "Instant AI Evaluation & Scoring",
      description: "Receive immediate 1-10 scores, detailed strengths analysis, and ideal benchmark answers to understand what interviewers look for."
    },
    {
      step: "06",
      icon: <Repeat size={28} className="text-amber-500" />,
      title: "Iterative Mastery & Growth",
      description: "Retake questions, monitor your score improvement rate over time, and gain the confidence to ace real-world technical rounds."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Preparation System</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How Mock AI Works
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          From role selection to real-time speech evaluation—master the end-to-end simulation pipeline designed to fast-track your interview readiness.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="
              glass-panel
              rounded-3xl
              p-7
              relative
              flex
              flex-col
              justify-between
              group
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-3xl font-black text-slate-300 dark:text-white/10 font-mono">
                  {item.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Highlight Cards */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-200 dark:border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="glass-card rounded-2xl p-6 space-y-2">
            <Zap className="w-6 h-6 text-cyan-500" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Gemini 1.5 Flash</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ultra-fast latency and deep reasoning capabilities to generate true-to-life interview scenarios.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-2">
            <Mic className="w-6 h-6 text-purple-500" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Spoken Voice Recognition</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Practice speaking under pressure instead of just typing to build muscle memory for real video rounds.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Zero Data Recording</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your webcam and audio feeds run locally in your browser. We never record or store candidate video.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center relative z-10 pt-6 border-t border-slate-200 dark:border-white/10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <span>Launch Your AI Interview Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;