'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import {
  FileText, Upload, X, CheckCircle2, XCircle, AlertCircle,
  Sparkles, Target, Zap, ChevronDown, ChevronUp, Copy,
  ArrowRight, RefreshCw, BarChart3, Shield, Brain,
  Award, Briefcase, Star, TrendingUp, Info, Download,
  Code, Globe, Layers, Eye, Trash2, History, Printer,
  Check, FileCheck, ArrowUpRight
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

// ─── Score Gauge ─────────────────────────────────────────────────────────────
function ScoreGauge({ score }) {
  const radius = 70
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const progress = Math.max(0, Math.min(100, Number(score) || 0))
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const getColor = (s) => {
    if (s >= 80) return { stroke: '#10b981', text: 'text-emerald-500', label: 'Top Tier Match', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' }
    if (s >= 65) return { stroke: '#06b6d4', text: 'text-cyan-500', label: 'Strong Match', bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400' }
    if (s >= 45) return { stroke: '#f59e0b', text: 'text-amber-500', label: 'Moderate Match', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' }
    return { stroke: '#ef4444', text: 'text-red-500', label: 'Needs Optimization', bg: 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' }
  }

  const meta = getColor(progress)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-700"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={meta.stroke}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-3xl font-black ${meta.text}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}
          </motion.span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ 100</span>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${meta.bg}`}>
        {meta.label}
      </span>
    </div>
  )
}

// ─── Mini Progress Bar ────────────────────────────────────────────────────────
function MiniBar({ label, value, color }) {
  const safeVal = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
        <span className="font-bold text-slate-900 dark:text-white">{safeVal}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-2 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${safeVal}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )
}

// ─── Loading Stages ───────────────────────────────────────────────────────────
const STAGES = [
  { icon: FileText, text: 'Parsing Resume Document & Extracting Sections...', color: 'text-cyan-500' },
  { icon: Layers, text: 'Semantic Section Chunking & Tech Profiling...', color: 'text-indigo-500' },
  { icon: Brain, text: 'Extracting Hard & Soft Skill Keywords from JD...', color: 'text-purple-500' },
  { icon: Target, text: 'Executing Semantic RAG Match Matrix...', color: 'text-amber-500' },
  { icon: BarChart3, text: 'Computing ATS Compatibility Score Breakdown...', color: 'text-emerald-500' },
  { icon: Sparkles, text: 'Synthesizing STAR Bullet Rewrites & Recommendations...', color: 'text-pink-500' },
]

function LoadingAnalyzer({ stage }) {
  const current = STAGES[Math.min(stage, STAGES.length - 1)]
  const Icon = current.icon
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
          <motion.div
            key={stage}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className={`w-10 h-10 ${current.color}`} />
          </motion.div>
        </div>
        <div className="absolute -inset-3 rounded-[2rem] border-2 border-cyan-500/20 animate-ping" />
      </div>

      <div className="text-center space-y-2">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-bold text-slate-900 dark:text-white"
        >
          {current.text}
        </motion.p>
        <p className="text-sm text-slate-500 dark:text-slate-400">AI RAG Pipeline Processing • Step {stage + 1} of {STAGES.length}</p>
      </div>

      <div className="flex gap-2">
        {STAGES.map((_, idx) => (
          <motion.div
            key={idx}
            className={`h-2 rounded-full transition-all duration-500 ${idx <= stage ? 'bg-cyan-500 w-6' : 'bg-slate-200 dark:bg-slate-700 w-2'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Keyword Chip ─────────────────────────────────────────────────────────────
function KeywordChip({ name, matched, priority, suggestion }) {
  const [showTip, setShowTip] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setShowTip(!showTip)}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer
          ${matched
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
            : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400 hover:bg-red-500/20'
          }
        `}
      >
        {matched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
        <span>{name}</span>
        {!matched && priority === 'High' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
      </button>
      <AnimatePresence>
        {showTip && suggestion && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute left-0 top-full mt-2 z-50 w-64 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-xs text-slate-700 dark:text-slate-300"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-1">Recommendation:</p>
            <p>{suggestion}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ title, icon: Icon, children, defaultOpen = false, accent = 'cyan' }) {
  const [open, setOpen] = useState(defaultOpen)
  const accents = {
    cyan: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    red: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
  }
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${accents[accent]}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

// ─── Role Templates ───────────────────────────────────────────────────────────
const ROLE_TEMPLATES = [
  {
    label: 'Frontend Dev',
    icon: '💻',
    jobTitle: 'Senior Frontend Developer',
    jd: `We are looking for a Senior Frontend Developer to build modern web applications.
Requirements:
- 3+ years of experience with React.js, Next.js, and TypeScript
- Strong understanding of HTML5, CSS3, Tailwind CSS, and state management (Zustand/Redux)
- RESTful APIs and GraphQL integration experience
- Unit testing with Jest and React Testing Library
- CI/CD workflows, Git, and web performance optimization
- Responsive design and accessibility standards (WCAG)`
  },
  {
    label: 'Backend Dev',
    icon: '⚙️',
    jobTitle: 'Backend Engineer',
    jd: `Seeking a Backend Engineer to build scalable microservices and APIs.
Requirements:
- 3+ years in Node.js/Express, Python (FastAPI/Django), or Java Spring Boot
- Relational databases (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis caching)
- Microservices, Docker containerization, and Kubernetes
- Cloud infrastructure on AWS or GCP
- REST API design, GraphQL, authentication (JWT/OAuth), and security best practices
- System design and performance tuning`
  },
  {
    label: 'Full Stack',
    icon: '🌐',
    jobTitle: 'Full Stack Engineer',
    jd: `Looking for a Full Stack Engineer to lead full lifecycle feature development.
Requirements:
- React.js / Next.js with TypeScript on the frontend
- Node.js / Express or Python backend APIs
- PostgreSQL database design, Drizzle/Prisma ORM
- Docker, CI/CD pipeline automation, and AWS hosting
- Responsive UI design and testing
- Agile development, Git collaboration, and product ownership`
  },
  {
    label: 'AI / ML Engineer',
    icon: '🤖',
    jobTitle: 'AI/ML & LLM Engineer',
    jd: `Join our team to build generative AI, RAG, and machine learning pipelines.
Requirements:
- Strong Python programming (NumPy, Pandas, Scikit-Learn)
- Deep Learning frameworks: PyTorch or TensorFlow
- Hands-on experience with LLMs, prompt engineering, fine-tuning, and RAG systems (LangChain/LlamaIndex)
- Vector databases (Pinecone, ChromaDB, pgvector)
- Model deployment, Docker containerization, and API integration`
  },
  {
    label: 'DevOps / Cloud',
    icon: '🔧',
    jobTitle: 'DevOps & Cloud Engineer',
    jd: `We need a DevOps Engineer to automate and scale our infrastructure.
Requirements:
- Linux administration, Bash/Python scripting
- Docker containerization and Kubernetes cluster management
- CI/CD automation with GitHub Actions or GitLab CI
- Infrastructure as Code (Terraform, Ansible)
- AWS/GCP cloud platforms and monitoring (Prometheus, Grafana)`
  },
]

const SAMPLE_RESUME = `Alex Morgan
alex.morgan@example.com | (555) 123-4567 | linkedin.com/in/alexmorgan | github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 3+ years of experience building scalable web applications using React, Next.js, Node.js, and PostgreSQL. Proven track record in optimizing application speed and designing RESTful APIs.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Redux, Tailwind CSS, Material UI
- Backend: Node.js, Express.js, REST APIs, GraphQL
- Databases & Tools: PostgreSQL, MongoDB, Redis, Docker, Git, GitHub Actions, Jest

PROFESSIONAL EXPERIENCE
Software Engineer | TechNova Solutions | June 2022 - Present
- Built and maintained responsive frontend user interfaces using React, Next.js, and TypeScript.
- Developed scalable REST APIs in Node.js and Express to handle user authentication and billing.
- Improved page loading performance by 30% through code-splitting, lazy loading, and asset optimization.
- Collaborated with cross-functional product and design teams in bi-weekly Agile sprints.

Junior Web Developer | InnovateX Labs | Aug 2021 - May 2022
- Developed UI components using React and styled them with Tailwind CSS.
- Assisted in database migrations and queries on PostgreSQL.
- Wrote unit tests with Jest, achieving 80% code coverage across core modules.

PROJECTS
AI Content Assistant | Next.js, Tailwind CSS, Gemini API, PostgreSQL
- Built a web application allowing users to generate and summarize technical articles with AI.
- Implemented user authentication with Clerk and integrated PostgreSQL via Drizzle ORM.

EDUCATION
Bachelor of Science in Computer Science | State University | 2021`

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function ResumeAnalyzerPage() {
  const { user } = useUser()

  // Active Tab: 'analyzer' | 'history'
  const [activeTab, setActiveTab] = useState('analyzer')

  // Upload / Input State
  const [uploadMode, setUploadMode] = useState('file') // 'file' | 'paste'
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [pastedText, setPastedText] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // Analysis State
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // History State
  const [historyList, setHistoryList] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  const fileInputRef = useRef(null)

  // ── Fetch Analysis History
  const fetchHistory = useCallback(async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress || 'guest@mockai.live'
    setLoadingHistory(true)
    try {
      const res = await fetch('/api/fetchResumeAnalyses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail }),
      })
      if (res.ok) {
        const data = await res.json()
        setHistoryList(data.analyses || [])
      }
    } catch (err) {
      console.warn('Failed to load history:', err)
    } finally {
      setLoadingHistory(false)
    }
  }, [user])

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchHistory()
    }
  }, [user, fetchHistory])

  // ── Delete from History
  const handleDeleteHistoryItem = async (e, id, resumeId) => {
    e.stopPropagation()
    try {
      const res = await fetch('/api/deleteResumeAnalysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, resumeId }),
      })
      if (res.ok) {
        setHistoryList((prev) => prev.filter((item) => item.id !== id && item.resumeId !== resumeId))
        toast.success("Saved report removed.")
      } else {
        toast.error("Could not delete report.")
      }
    } catch (err) {
      toast.error("Delete failed.")
    }
  }

  // ── View Past Analysis
  const handleViewPastReport = (item) => {
    setResult({
      success: true,
      resumeId: item.resumeId,
      jobTitle: item.jobTitle,
      fileName: item.resumeFileName || 'Resume Document',
      atsScore: item.atsScore,
      analysis: item.analysisResult,
      createdAt: item.createdAt,
    })
    setActiveTab('analyzer')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Drag & Drop
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }, [])

  // ── Template Select
  const applyTemplate = (tpl) => {
    setSelectedTemplate(tpl.label)
    setJobTitle(tpl.jobTitle)
    setJobDescription(tpl.jd)
    toast.success(`Loaded "${tpl.label}" role template`)
  }

  // ── Load Sample Resume
  const loadSampleResume = () => {
    setUploadMode('paste')
    setPastedText(SAMPLE_RESUME)
    setJobTitle('Full Stack Engineer')
    setJobDescription(ROLE_TEMPLATES[2].jd)
    setSelectedTemplate('Full Stack')
    toast.success("Sample Full Stack resume loaded!")
  }

  // ── Stage Simulation
  const simulateStages = () => {
    const intervals = STAGES.map((_, i) =>
      setTimeout(() => setLoadingStage(i), i * 1300)
    )
    return () => intervals.forEach(clearTimeout)
  }

  // ── Submit Analysis
  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a target Job Description.')
      return
    }
    if (!file && pastedText.trim().length < 25) {
      setError('Please upload a resume file (.pdf, .docx, .txt) or paste at least 25 characters of resume text.')
      return
    }

    setError(null)
    setResult(null)
    setLoading(true)
    setLoadingStage(0)
    const cleanup = simulateStages()

    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      formData.append('resumeText', pastedText)
      formData.append('jobTitle', jobTitle || 'Software Engineer')
      formData.append('jobDescription', jobDescription)
      formData.append('userEmail', user?.primaryEmailAddress?.emailAddress || 'guest@mockai.live')

      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      cleanup()

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Analysis failed. Please try again.')
      }

      setResult(data)
      toast.success("ATS Evaluation complete!")
      fetchHistory()
    } catch (err) {
      setError(err.message)
      toast.error(err.message || "Evaluation failed.")
    } finally {
      setLoading(false)
    }
  }

  const resetAll = () => {
    setResult(null)
    setError(null)
    setFile(null)
    setPastedText('')
    setJobTitle('')
    setJobDescription('')
    setSelectedTemplate(null)
    setLoadingStage(0)
  }

  // ── Export Report as Markdown
  const exportReportMarkdown = () => {
    if (!result?.analysis) return
    const a = result.analysis
    const md = `# ATS Resume Analysis Report
**Target Role:** ${result.jobTitle || 'Software Engineer'}
**File:** ${result.fileName || 'Candidate Resume'}
**ATS Score:** ${a.ats_score}/100 (${a.match_tier})
**Date:** ${result.createdAt || new Date().toLocaleDateString()}

---
## Executive Summary
${a.executive_summary}

---
## Score Breakdown
- Keyword Match: ${a.score_breakdown?.keyword_match}%
- Experience Relevance: ${a.score_breakdown?.experience_relevance}%
- Skills Alignment: ${a.score_breakdown?.skills_alignment}%
- ATS Formatting Score: ${a.score_breakdown?.ats_formatting_score}%
- Quantified Impact: ${a.score_breakdown?.quantified_impact_score}%

---
## Matched Keywords (${(a.matched_keywords || []).length})
${(a.matched_keywords || []).map(k => `- **${k.name}** (${k.category || 'Skill'})`).join('\n')}

## Missing Keywords (${(a.missing_keywords || []).length})
${(a.missing_keywords || []).map(k => `- **${k.name}** [${k.priority || 'Medium'} Priority]: ${k.suggestion || ''}`).join('\n')}

---
## Key Strengths
${(a.strengths || []).map(s => `- ${s}`).join('\n')}

## Critical Gaps
${(a.critical_gaps || []).map(g => `- ${g}`).join('\n')}

---
## AI Bullet Point Rewrites
${(a.bullet_point_improvements || []).map(b => `### Original:\n> ${b.original}\n\n### Improved:\n**${b.improved}**\n*Reason: ${b.reason}*\n`).join('\n---\n')}

---
## ATS Compliance Checklist
${(a.ats_compliance_checklist || []).map(c => `- [${c.passed ? 'X' : ' '}] ${c.check} (${c.tip})`).join('\n')}

---
## Actionable Pro Tips
${(a.ats_tips || []).map((t, idx) => `${idx + 1}. ${t}`).join('\n')}
`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ATS_Report_${(result.jobTitle || 'Resume').replace(/\s+/g, '_')}.md`
    link.click()
    URL.revokeObjectURL(url)
    toast.success("Report downloaded successfully!")
  }

  const analysis = result?.analysis

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" />
          Semantic RAG ATS Engine
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
          AI Resume Analyzer &{' '}
          <span className="gradient-text-ai">ATS Optimizer</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Upload your resume and target job description to get an objective ATS compatibility score, semantic keyword matrix, and AI-optimized STAR bullet rewrites.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'analyzer'
                ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            Resume Analyzer
          </button>
          <button
            onClick={() => {
              setActiveTab('history')
              fetchHistory()
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Saved Reports ({historyList.length})
          </button>
        </div>
      </motion.div>

      {/* ─────────── TAB: SAVED HISTORY ─────────── */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-500" />
              Your Previous ATS Evaluations
            </h2>
            <button
              onClick={fetchHistory}
              disabled={loadingHistory}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingHistory ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {historyList.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-500">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Saved Analyses Yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Evaluate a resume against a job description to track your ATS compatibility scores and improvements over time.
              </p>
              <button
                onClick={() => setActiveTab('analyzer')}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold text-sm hover:bg-cyan-600 transition-colors"
              >
                Start New Analysis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {historyList.map((item) => {
                const score = Number(item.atsScore) || 70
                const badgeColor =
                  score >= 80 ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                  score >= 65 ? 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' :
                  score >= 45 ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                  'text-red-500 bg-red-500/10 border-red-500/20'

                return (
                  <div
                    key={item.id || item.resumeId}
                    onClick={() => handleViewPastReport(item)}
                    className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-200 cursor-pointer relative group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${badgeColor}`}>
                          ATS {score}/100
                        </span>
                        <button
                          onClick={(e) => handleDeleteHistoryItem(e, item.id, item.resumeId)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete Report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {item.jobTitle || 'Software Engineer'}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate">{item.resumeFileName || 'Resume Document'}</span>
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <span>{item.createdAt || 'Recent'}</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Report <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* ─────────── TAB: ANALYZER ─────────── */}
      {activeTab === 'analyzer' && (
        <AnimatePresence mode="wait">
          {/* ─────────── INPUT FORM ─────────── */}
          {!loading && !result && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quick Sample Demo Banner */}
              <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-cyan-500/30 bg-cyan-500/5">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Want a quick test drive?</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Load our sample Full Stack resume and target JD with 1-click.</p>
                  </div>
                </div>
                <button
                  onClick={loadSampleResume}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-semibold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  <FileCheck className="w-4 h-4" />
                  Load Sample Resume
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ── LEFT: Resume Upload ── */}
                <div className="space-y-5">
                  <div className="glass-card rounded-3xl p-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      Step 1: Your Resume
                    </h2>

                    {/* Mode Toggle */}
                    <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 mb-4">
                      {[['file', Upload, 'Upload File (PDF/DOCX)'], ['paste', FileText, 'Paste Resume Text']].map(([mode, Icon, label]) => (
                        <button
                          key={mode}
                          onClick={() => setUploadMode(mode)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                            uploadMode === mode
                              ? 'bg-cyan-500 text-white'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>

                    {uploadMode === 'file' ? (
                      <div>
                        {/* Drag & Drop Zone */}
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`
                            relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all
                            ${dragActive
                              ? 'border-cyan-500 bg-cyan-500/10 scale-[1.01]'
                              : file
                              ? 'border-emerald-500/50 bg-emerald-500/5'
                              : 'border-slate-300 dark:border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5'
                            }
                          `}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.docx,.txt"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          {file ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{file.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  {(file.size / 1024).toFixed(1)} KB • Click or drag to replace
                                </p>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); setFile(null) }}
                                className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-7 h-7 text-slate-400" />
                              </div>
                              <p className="font-bold text-slate-900 dark:text-white mb-1">Drop your resume here</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">PDF, DOCX, or TXT • Text-based documents</p>
                              <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-2 font-semibold">or click to browse</p>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <textarea
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                        placeholder="Paste your full resume text here...&#10;&#10;Include: Contact Info, Summary, Technical Skills, Work Experience, Projects, Education"
                        rows={13}
                        className="w-full rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 p-4 text-xs sm:text-sm resize-none focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                      />
                    )}
                  </div>
                </div>

                {/* ── RIGHT: Job Description ── */}
                <div className="space-y-5">
                  <div className="glass-card rounded-3xl p-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      Step 2: Target Job Description
                    </h2>

                    {/* Job Title */}
                    <input
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Target Job Title (e.g., Senior Full Stack Developer)"
                      className="w-full mb-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />

                    {/* JD Textarea */}
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full Job Description here...&#10;&#10;Include core requirements, responsibilities, preferred tech stack, and qualifications."
                      rows={8}
                      className="w-full rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 p-4 text-sm resize-none focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />

                    {/* Template chips */}
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Quick Role Presets
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ROLE_TEMPLATES.map((tpl) => (
                          <button
                            key={tpl.label}
                            onClick={() => applyTemplate(tpl)}
                            className={`
                              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all
                              ${selectedTemplate === tpl.label
                                ? 'bg-cyan-500 border-cyan-500 text-white'
                                : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400'
                              }
                            `}
                          >
                            <span>{tpl.icon}</span>
                            {tpl.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Analyze Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full relative group overflow-hidden rounded-2xl p-[2px] shadow-xl shadow-cyan-500/20 active:scale-[0.98] transition-transform"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-2xl animate-shimmer" />
                    <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-[14px] bg-[#070B14] text-white font-bold text-base group-hover:bg-[#070B14]/80 transition-colors">
                      <Brain className="w-5 h-5 text-cyan-400" />
                      <span>Analyze Resume with RAG & AI</span>
                      <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─────────── LOADING ─────────── */}
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="glass-card rounded-3xl p-8">
                <LoadingAnalyzer stage={loadingStage} />
              </div>
            </motion.div>
          )}

          {/* ─────────── RESULTS ─────────── */}
          {!loading && result && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* ── Top Action Bar ── */}
              <div className="flex items-center justify-between flex-wrap gap-4 glass-card rounded-2xl p-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    ATS Optimization & Semantic Report
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Target: <span className="font-semibold text-slate-800 dark:text-slate-200">{result.jobTitle}</span> • Source: {result.fileName}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={exportReportMarkdown}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-cyan-500/20 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Markdown Report
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/10 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print / PDF
                  </button>
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    New Analysis
                  </button>
                </div>
              </div>

              {/* ── Score + Breakdown Row ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="glass-card rounded-3xl p-8 flex flex-col items-center gap-4 md:col-span-1">
                  <ScoreGauge score={analysis.ats_score || 75} />
                  <div className="w-full pt-4 border-t border-slate-100 dark:border-white/10">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-3 text-center">Score Breakdown</p>
                    <div className="space-y-3">
                      <MiniBar label="Keyword Match" value={analysis.score_breakdown?.keyword_match || 80} color="bg-cyan-500" />
                      <MiniBar label="Experience Relevance" value={analysis.score_breakdown?.experience_relevance || 75} color="bg-indigo-500" />
                      <MiniBar label="Skills Alignment" value={analysis.score_breakdown?.skills_alignment || 85} color="bg-purple-500" />
                      <MiniBar label="ATS Formatting" value={analysis.score_breakdown?.ats_formatting_score || 90} color="bg-emerald-500" />
                      <MiniBar label="Quantified Impact" value={analysis.score_breakdown?.quantified_impact_score || 70} color="bg-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Executive Summary + Compliance */}
                <div className="md:col-span-2 space-y-5">
                  {/* Summary */}
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h3 className="font-bold text-slate-900 dark:text-white">AI Executive Evaluation</h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {analysis.executive_summary}
                    </p>
                  </div>

                  {/* ATS Compliance Checklist */}
                  <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="font-bold text-slate-900 dark:text-white">ATS Compliance Checklist</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(analysis.ats_compliance_checklist || []).map((item, i) => (
                        <div key={i} className={`flex items-start gap-2 p-3 rounded-xl border text-xs ${item.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                          {item.passed
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          }
                          <div>
                            <p className={`font-semibold ${item.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>{item.check}</p>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5">{item.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Keyword Match Matrix ── */}
              <Accordion title="Semantic Keyword Match Matrix" icon={Layers} defaultOpen={true} accent="cyan">
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Detected & Matched in Resume ({(analysis.matched_keywords || []).length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(analysis.matched_keywords || []).map((kw, i) => (
                        <KeywordChip key={i} name={kw.name} matched={true} />
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <XCircle className="w-3.5 h-3.5" />
                      Missing from Resume ({(analysis.missing_keywords || []).length}) — Click chip for recommendation
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(analysis.missing_keywords || []).map((kw, i) => (
                        <KeywordChip key={i} name={kw.name} matched={false} priority={kw.priority} suggestion={kw.suggestion} />
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion>

              {/* ── Strengths & Gaps ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Accordion title="Strengths & Highlights" icon={Star} defaultOpen={true} accent="emerald">
                  <ul className="space-y-2.5">
                    {(analysis.strengths || []).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Critical Gaps & Weaknesses" icon={AlertCircle} defaultOpen={true} accent="red">
                  <ul className="space-y-2.5">
                    {(analysis.critical_gaps || []).map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>

              {/* ── AI Bullet Rewrites ── */}
              <Accordion title="AI STAR-Method Bullet Point Rewriter" icon={Sparkles} defaultOpen={true} accent="purple">
                <div className="space-y-6">
                  {(analysis.bullet_point_improvements || []).map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Before (Original Resume)</span>
                          <CopyBtn text={item.original} />
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{item.original}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">After (AI-Optimized & Quantified)</span>
                          <CopyBtn text={item.improved} />
                        </div>
                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{item.improved}</p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 px-1 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <span>{item.reason}</span>
                      </p>
                      {i < (analysis.bullet_point_improvements.length - 1) && (
                        <div className="border-t border-slate-100 dark:border-white/10 pt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </Accordion>

              {/* ── Section Feedback ── */}
              <Accordion title="Section-by-Section Feedback" icon={Target} accent="amber">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(analysis.section_feedback || {}).map(([section, feedback]) => (
                    <div key={section} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 capitalize">{section}</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{feedback}</p>
                    </div>
                  ))}
                </div>
              </Accordion>

              {/* ── Pro Tips ── */}
              <Accordion title="Pro ATS Scoring Strategies" icon={TrendingUp} accent="cyan">
                <ul className="space-y-3">
                  {(analysis.ats_tips || []).map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-xs flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              {/* ── CTA Banner ── */}
              <div className="glass-panel rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 relative z-10">
                  Ready to Practice for {result.jobTitle || 'Your Role'}?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-xl mx-auto relative z-10">
                  Now that your resume is optimized, launch an AI mock interview tailored to this specific job profile and technical stack.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all relative z-10"
                >
                  <Brain className="w-5 h-5" />
                  Launch AI Mock Interview
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
