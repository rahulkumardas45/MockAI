"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { 
  Lightbulb, 
  WebcamIcon, 
  Camera, 
  CameraOff, 
  Mic, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Clock, 
  Code, 
  HelpCircle,
  Play
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { motion } from "framer-motion";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        toast.error("Interview details not found");
      }
    } catch (error) {
      toast.error("Error fetching interview details");
      console.error("Interview details fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWebcamToggle = () => {
    if (!webCamEnabled) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then(() => {
          setWebCamEnabled(true);
          toast.success("Camera & Microphone ready");
        })
        .catch((error) => {
          toast.error("Failed to access camera/mic. Please check browser permissions.");
          console.error("Webcam access error:", error);
        });
    } else {
      setWebCamEnabled(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading interview briefing room...</p>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto my-12 space-y-4">
        <h2 className="text-xl font-bold text-red-500">Interview Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">This interview session may have been removed.</p>
        <Link href="/dashboard">
          <Button className="rounded-xl">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const techTags = (interviewData.jobDesc || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Interview Readiness Studio</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ready to Begin: {interviewData.jobPosition}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Check your audio/video setup and review the interview parameters before starting.
          </p>
        </div>

        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="rounded-2xl px-6 py-5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all">
            <Play className="w-4 h-4 fill-white mr-2" />
            <span>Enter AI Interview Room</span>
          </Button>
        </Link>
      </div>

      {/* Main Grid: Info + Camera Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job & Guidelines (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Role Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {interviewData.jobPosition}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Target Role Specification
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-card rounded-2xl p-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Experience Level
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock size={16} className="text-emerald-500" />
                  {interviewData.jobExperience} {parseInt(interviewData.jobExperience) === 1 ? 'Year' : 'Years'}
                </p>
              </div>

              <div className="glass-card rounded-2xl p-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Questions Count
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <HelpCircle size={16} className="text-purple-500" />
                  5 AI Scenarios
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Tech Stack Covered
              </span>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Guidelines Note */}
          <div className="glass-card rounded-3xl p-6 border-amber-500/20 bg-amber-500/5 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Lightbulb className="w-5 h-5 flex-shrink-0" />
              <span>How this AI Mock Session Works</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
              <li>You will be presented with <strong>5 curated questions</strong> one by one.</li>
              <li>You can click <strong>"Record Answer"</strong> to speak naturally using your microphone.</li>
              <li>Our AI will transcribe and score your answer on clarity, depth, and technical correctness.</li>
              <li><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Privacy First:</span> Video/Audio is processed in real time and is never stored on our servers.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Camera Preview Studio (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 h-full relative overflow-hidden">
            {/* Top status tag */}
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Studio Preview Feed
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                webCamEnabled 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'bg-slate-200 dark:bg-white/5 text-slate-500 border border-slate-300 dark:border-white/10'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${webCamEnabled ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
                {webCamEnabled ? 'Device Active' : 'Camera Off'}
              </span>
            </div>

            {/* Video Box */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-black/60 border border-slate-300 dark:border-white/10 overflow-hidden relative flex items-center justify-center shadow-inner">
              {webCamEnabled ? (
                <Webcam
                  mirrored={true}
                  className="w-full h-full object-cover"
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => {
                    toast.error("Webcam access error");
                    setWebCamEnabled(false);
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 p-6 text-slate-400">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <WebcamIcon size={28} className="text-slate-400" />
                  </div>
                  <p className="text-xs max-w-xs">
                    Enable your webcam for a realistic interview environment simulation.
                  </p>
                </div>
              )}

              {/* Futuristic HUD Corners */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
            </div>

            {/* Camera Toggle Button */}
            <Button
              variant="outline"
              onClick={handleWebcamToggle}
              className="w-full rounded-xl text-xs font-semibold h-11 border-slate-200 dark:border-white/10 hover:border-cyan-500"
            >
              {webCamEnabled ? (
                <>
                  <CameraOff className="w-4 h-4 mr-2 text-red-500" />
                  <span>Disable Video Feed</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2 text-cyan-500" />
                  <span>Enable Video & Mic Preview</span>
                </>
              )}
            </Button>

            {/* Launch Button */}
            <Link href={`/dashboard/interview/${params.interviewId}/start`} className="w-full pt-2">
              <Button className="w-full rounded-xl py-6 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-transform">
                <span>Start Practice Session</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;