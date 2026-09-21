'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Bot, 
  ArrowRight, 
  Mic, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Play, 
  Award, 
  Users, 
  BarChart3,
  FileText
} from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-16">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-purple-600/10 dark:from-cyan-500/20 dark:via-indigo-600/15 dark:to-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-8 shadow-sm dark:shadow-lg dark:shadow-cyan-500/10 hover:border-cyan-500/50 transition-colors"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Next-Gen AI Interview Simulation & ATS Resume Engine</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.15]"
        >
          Ace Your Next Interview with{' '}
          <span className="gradient-text-ai block sm:inline">
            Intelligent AI Coaching
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Experience realistic, real-time mock interviews customized to your job role and tech stack. 
          Audit your resume with our RAG-powered ATS analyzer and unlock deep actionable feedback.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto relative group overflow-hidden rounded-2xl p-[2px] transition-transform active:scale-95 shadow-xl shadow-cyan-500/15"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-2xl animate-shimmer" />
            <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-[14px] bg-[#070B14] text-white font-bold text-base transition-colors group-hover:bg-[#070B14]/85">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Start Free AI Interview</span>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/dashboard/resume-analyzer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl glass-card text-slate-800 dark:text-slate-200 font-semibold text-base hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500/40 transition-all shadow-sm"
          >
            <FileText className="w-5 h-5 text-cyan-500" />
            <span>ATS Resume Analyzer</span>
          </Link>

          <Link
            href="/how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl glass-card text-slate-800 dark:text-slate-200 font-semibold text-base hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500/40 transition-all shadow-sm"
          >
            <Play className="w-4 h-4 text-purple-600 dark:text-purple-400 fill-purple-600/20 dark:fill-purple-400/30" />
            <span>How It Works</span>
          </Link>
        </motion.div>

        {/* Quick Highlights / Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <Mic className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
              title: "Voice-To-Text AI",
              desc: "Real-time speech recognition"
            },
            {
              icon: <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
              title: "Gemini AI Engine",
              desc: "Deep semantic reasoning"
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
              title: "Instant Scoring",
              desc: "Deep comparative reports"
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
              title: "100% Private",
              desc: "No video recorded or stored"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-2xl text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 pt-10 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-black gradient-text-ai">50K+</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Questions Generated</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black gradient-text-emerald">94.8%</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black gradient-text-ai">100+</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Job Roles Supported</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black gradient-text-amber">4.9 / 5.0</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Candidate Rating</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}