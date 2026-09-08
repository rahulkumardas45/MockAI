"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle({ className = "" }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-white/10 bg-white/5 ${className}`} />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative p-2 rounded-xl border transition-all duration-300
        ${
          isDark
            ? "border-white/10 bg-white/5 text-amber-300 hover:bg-white/10 hover:border-amber-300/30 shadow-lg shadow-amber-500/5"
            : "border-slate-300 bg-slate-100 text-indigo-600 hover:bg-slate-200 hover:border-indigo-400 shadow-sm"
        }
        ${className}
      `}
      title={isDark ? "Switch to Day (Light) Mode" : "Switch to Night (Dark) Mode"}
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 90, scale: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600" />
        )}
      </motion.div>
    </button>
  )
}
