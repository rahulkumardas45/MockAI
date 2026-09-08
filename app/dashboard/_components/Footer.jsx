import React from "react";
import Link from "next/link";
import { BrainCircuit, Github, Linkedin, Twitter, Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-[#060910] text-slate-700 dark:text-slate-300 pt-16 pb-12 overflow-hidden z-10 transition-colors">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <BrainCircuit className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black gradient-text-ai">
                Mock AI
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
              Empowering engineers and job seekers with cutting-edge Gemini AI interview simulations, live speech scoring, and comprehensive feedback to ace competitive interviews.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Gemini 1.5 Flash Online
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-mono">
                <Zap className="w-3 h-3" /> Voice STT Enabled
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  AI Interview Studio
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Mission & Story
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Preparation Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Community */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  LeetCode Practice
                </a>
              </li>
              <li>
                <a href="https://www.geeksforgeeks.org/system-design/getting-started-with-system-design/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  System Design Primer
                </a>
              </li>
              <li>
                <a href="https://www.pramp.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Peer Mock Sessions
                </a>
              </li>
              <li>
                <span className="text-slate-500 text-xs flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> Private & Camera Safe
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Mock AI Studio. Built with passion & AI innovation.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-200/70 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-200/70 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-200/70 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
