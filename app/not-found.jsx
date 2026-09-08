'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="glass-card rounded-3xl p-10 max-w-md space-y-4">
        <span className="text-6xl font-black gradient-text-ai">404</span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
