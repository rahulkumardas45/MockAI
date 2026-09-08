'use client'

import { useState } from 'react'
import {
  Book,
  Code,
  PenTool,
  Target,
  Globe,
  Award,
  Brain,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './dashboard/_components/HeroSection'
import Link from 'next/link'

const ResourceCard = ({ icon, title, description, badge, links }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="
      glass-card
      rounded-3xl
      p-7
      flex
      flex-col
      h-full
      relative
      group
      hover:-translate-y-2
      transition-all
      duration-300
    "
  >
    {/* Glow Highlight */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="w-13 h-13 p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {badge && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/5">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-slate-50 dark:bg-white/5
              border
              border-slate-200 dark:border-white/5
              px-4
              py-2.5
              hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15
              hover:border-cyan-500/30
              transition-all
              duration-200
              text-xs sm:text-sm
              group/link
            "
          >
            <span className="text-slate-700 dark:text-slate-300 group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-300 font-medium">
              {link.name}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-cyan-500 group-hover/link:translate-x-0.5 transition-all" />
          </a>
        ))}
      </div>
    </div>
  </motion.div>
)

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('tech')

  const resourceCategories = {
    tech: {
      label: 'Coding & DSA',
      icon: Terminal,
      resources: [
        {
          title: 'Algorithmic Problem Solving',
          badge: 'Top Tier',
          description: 'Practice coding challenges, data structures, and algorithms commonly asked at FAANG/MAANG companies.',
          icon: <Code className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
          links: [
            { name: 'LeetCode Problem Sets', url: 'https://leetcode.com/' },
            { name: 'GeeksforGeeks DSA Hub', url: 'https://www.geeksforgeeks.org/' },
            { name: 'HackerRank Interview Prep', url: 'https://www.hackerrank.com/' },
            { name: 'CodeChef Competitions', url: 'https://www.codechef.com/' }
          ]
        },
        {
          title: 'System Design & Architecture',
          badge: 'High Value',
          description: 'Master scalable backend system architectures, microservices, load balancing, caching, and database design.',
          icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
          links: [
            { name: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' },
            { name: 'GeeksforGeeks System Design', url: 'https://www.geeksforgeeks.org/system-design/getting-started-with-system-design/' },
            { name: 'ByteByteGo Visual Architecture', url: 'https://bytebytego.com/' }
          ]
        },
        {
          title: 'Technical Interview Mastery',
          badge: 'Interactive',
          description: 'Structured topic-wise technical questions with step-by-step solutions for full-stack and specialized roles.',
          icon: <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
          links: [
            { name: 'InterviewBit Tracks', url: 'https://www.interviewbit.com/' },
            { name: 'Pramp Peer Practice', url: 'https://www.pramp.com/' },
            { name: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/' }
          ]
        }
      ]
    },

    aptitude: {
      label: 'Aptitude & Logic',
      icon: PenTool,
      resources: [
        {
          title: 'Quantitative Aptitude & Logic',
          badge: 'Foundations',
          description: 'Practice speed math, data interpretation, probability, and logical reasoning for campus placement tests.',
          icon: <PenTool className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          links: [
            { name: 'IndiaBix Practice Tests', url: 'https://www.indiabix.com/' },
            { name: 'Freshersworld Aptitude Questions', url: 'https://www.freshersworld.com/aptitude-questions' },
            { name: 'MathsGuru Reasoning Sets', url: 'https://www.mathsguru.com/reasoning-questions/' }
          ]
        },
        {
          title: 'Competitive Exams & Assessments',
          badge: 'GATE / Placement',
          description: 'Curated previous year questions and mock test banks for placement entrance examinations.',
          icon: <Award className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
          links: [
            { name: 'GATE Overflow Community', url: 'https://gateoverflow.in/' },
            { name: 'Career Power Mock Tests', url: 'https://careerpower.in/' },
            { name: 'Brilliant Problem Solving', url: 'https://brilliant.org/' }
          ]
        }
      ]
    },

    interview: {
      label: 'Career & Guides',
      icon: Book,
      resources: [
        {
          title: 'Company Specific Guides',
          badge: 'Company Insights',
          description: 'Read real candidate interview experiences, salary insights, and typical interview rounds across top firms.',
          icon: <Book className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
          links: [
            { name: 'AmbitionBox Experiences', url: 'https://www.ambitionbox.com/' },
            { name: 'Glassdoor Interview Reviews', url: 'https://www.glassdoor.com/' },
            { name: 'Shiksha Career Guidance', url: 'https://www.shiksha.com/' }
          ]
        },
        {
          title: 'Specialized Courses & Certifications',
          badge: 'Learning Paths',
          description: 'Deepen core engineering topics with industry recognized courses and hands-on specializations.',
          icon: <Globe className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
          links: [
            { name: 'Coursera Computer Science', url: 'https://www.coursera.org/' },
            { name: 'edX Professional Programs', url: 'https://www.edx.org/' },
            { name: 'freeCodeCamp Full Stack', url: 'https://www.freecodecamp.org/' }
          ]
        }
      ]
    }
  }

  const currentResources = resourceCategories[activeCategory]?.resources || []

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Preparation Hub Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Learning Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Interview Prep Hub
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Handpicked study material, practice platforms, and architectural guides to complement your AI mock sessions.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {Object.entries(resourceCategories).map(([key, item]) => {
            const Icon = item.icon
            const isActive = activeCategory === key
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`
                  flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                      : 'glass-card text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-cyan-500/40 shadow-sm'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-600 dark:text-cyan-400'}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {currentResources.map((resource, index) => (
              <ResourceCard key={resource.title + index} {...resource} />
            ))}
          </AnimatePresence>
        </div>

        {/* Level Up Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl glass-panel p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Ready to Test Your Real-Time Readiness?
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Create an AI interview simulation in under 30 seconds. Choose your target role, specify your tech stack, and experience full speech grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'Step 1: Configure Role',
                desc: 'Pick your position, tech stack, and senior or junior experience level.',
                icon: Layers,
                color: 'text-cyan-600 dark:text-cyan-400'
              },
              {
                title: 'Step 2: Practice with Speech',
                desc: 'Speak naturally into your mic while the AI records and analyzes your voice.',
                icon: Brain,
                color: 'text-purple-600 dark:text-purple-400'
              },
              {
                title: 'Step 3: Executive Feedback',
                desc: 'Get a 1-10 rating, model answers, and constructive critique immediately.',
                icon: Award,
                color: 'text-emerald-600 dark:text-emerald-400'
              }
            ].map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl text-center flex flex-col items-center shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center relative z-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <span>Launch Mock Interview Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}