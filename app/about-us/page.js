'use client'

import { useState } from 'react'
import { 
  Users, 
  Target, 
  Award, 
  Briefcase, 
  BookOpen, 
  Rocket,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Shield,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const tabContent = {
    mission: {
      label: 'Our Mission',
      icon: Target,
      title: 'Empowering Every Engineer to Reach Their Career Potential',
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Mock AI was founded on a simple belief: interview preparation should be personalized, accessible, and realistic. Traditional interview prep often leaves candidates anxious and unprepared for the nuances of live technical and behavioral discussions.
          </p>
          <p>
            By marrying cutting-edge large language models with browser-native speech recognition, we provide an intelligent, interactive simulation environment where job seekers can practice without fear of judgment, receive instantaneous scoring, and continuously level up.
          </p>
        </div>
      )
    },
    story: {
      label: 'Our Story',
      icon: BookOpen,
      title: 'From Personal Interview Anxiety to AI Innovation',
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Like countless software engineers, our team experienced the stress of high-stakes technical interviews. Finding qualified peers for mock interviews was difficult, expensive, and inconsistent.
          </p>
          <p>
            We set out to build a platform that feels like an experienced engineering manager is sitting across from you—asking pointed questions, listening to your spoken responses, and giving you constructive, actionable advice that helps you land your dream offer.
          </p>
        </div>
      )
    },
    approach: {
      label: 'Our AI Engine',
      icon: Rocket,
      title: 'Real-Time Voice Analysis & Dynamic Scenario Generation',
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Our engine leverages Google Gemini 1.5 to dynamically analyze your target role and seniority, generating custom question sets rather than relying on static question banks.
          </p>
          <p>
            Spoken responses are transcribed using browser speech recognition, and answers are evaluated against technical benchmarks, highlighting strengths and offering model solutions.
          </p>
        </div>
      )
    }
  }

  const coreValues = [
    {
      icon: <Award className="w-8 h-8 text-cyan-500" />,
      title: "Continuous Excellence",
      description: "Iteratively refining AI grading algorithms to reflect current industry interview bars and expectations."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-purple-500" />,
      title: "Candidate Empowerment",
      description: "Providing a safe, supportive sandbox to build public speaking confidence and articulate complex systems."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Privacy & Integrity",
      description: "Your camera and audio streams belong to you. We maintain transparent, secure evaluations with zero recording."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Building the Future of Career Prep</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About Mock AI
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          We are dedicated to helping developers, engineers, and professionals master technical conversations and succeed in top tech interviews.
        </p>
      </div>

      {/* Interactive Tabs Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10">
        {/* Tab Buttons */}
        <div className="flex flex-col sm:flex-row border-b border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5">
          {Object.entries(tabContent).map(([key, tab]) => {
            const Icon = tab.icon
            const isActive = activeTab === key
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                  flex-1 py-4 px-6 flex items-center justify-center gap-2.5 text-sm font-semibold transition-all duration-200 border-b-2 sm:border-b-0
                  ${
                    isActive
                      ? 'bg-white dark:bg-slate-900/80 text-cyan-600 dark:text-cyan-400 border-cyan-500 sm:border-b-2 sm:border-cyan-500 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 border-transparent'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-500' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {tabContent[activeTab].title}
              </h3>
              {tabContent[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Core Principles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            The foundation behind our design, models, and community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Begin Your AI Interview Practice Today
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Experience real-time feedback, custom tailored questions, and comprehensive scoring designed to boost your confidence.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          <span>Launch Practice Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default AboutUsPage