"use client";

import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Menu, X, Sparkles, ArrowRight, LayoutDashboard, Compass, HelpCircle, Info, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const navItems = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/resume-analyzer", label: "Resume Analyzer", icon: FileText },
    { href: "/how-it-works", label: "How It Works", icon: HelpCircle },
    { href: "/about-us", label: "About Us", icon: Info },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          fixed top-0 left-0 right-0 w-full z-50
          transition-all duration-300
          ${
            scrolled
              ? "py-3 bg-white/80 dark:bg-[#070B14]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : "py-4 bg-white/40 dark:bg-[#070B14]/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* BRAND LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Mock AI Home"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                <BrainCircuit className="text-white w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight gradient-text-ai group-hover:opacity-90 transition-opacity">
                MockAI<span className="text-cyan-500 dark:text-cyan-400 font-mono text-sm ml-0.5">.live</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase -mt-1 hidden sm:block">
                AI Interview Studio
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = path === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-300 shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 dark:from-cyan-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 border border-cyan-500/30 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-slate-400"}`} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS / AUTH / THEME TOGGLE */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <SignedOut>
              <SignInButton mode="modal">
                <button className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm transition-transform active:scale-95 shadow-md">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-90 animate-shimmer" />
                  <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors group-hover:bg-opacity-90">
                    <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    <span>Get Started</span>
                  </span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 pl-1">
                <Link
                  href="/dashboard"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                >
                  <span>Practice Room</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-9 h-9 rounded-xl ring-2 ring-cyan-500/30 ring-offset-2 ring-offset-white dark:ring-offset-[#070B14] transition-all hover:scale-105",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* MOBILE MENU TOGGLE + THEME TOGGLE */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-lg ring-1 ring-slate-300 dark:ring-white/20",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-cyan-500 transition-colors"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-2xl z-40 md:hidden flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-2 flex-grow">
              {navItems.map((item) => {
                const isActive = path === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-semibold transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/15 to-purple-500/15 dark:from-cyan-500/20 dark:to-purple-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-cyan-500" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    onClick={closeMobileMenu}
                    className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 text-center flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Sign In & Start Free</span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 text-center flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Practice Dashboard</span>
                </Link>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;