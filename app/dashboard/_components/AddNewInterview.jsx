"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { 
  LoaderCircle, 
  Sparkles, 
  Bot, 
  Layers, 
  Briefcase, 
  Clock, 
  Code2, 
  Cpu, 
  Wand2, 
  CheckCircle,
  Plus
} from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_ROLES = [
  { name: 'Full Stack Developer', stack: 'React, Next.js, Node.js, Express, PostgreSQL, TypeScript' },
  { name: 'Frontend Developer', stack: 'React, Next.js, TypeScript, Tailwind CSS, Redux, HTML5/CSS3' },
  { name: 'Backend Developer', stack: 'Python, FastAPI, Node.js, PostgreSQL, Docker, Redis, Microservices' },
  { name: 'AI / ML Engineer', stack: 'Python, PyTorch, TensorFlow, LangChain, LLMs, NLP, Vector DBs' },
  { name: 'DevOps / Cloud Engineer', stack: 'AWS, Docker, Kubernetes, CI/CD, Terraform, Linux, Prometheus' },
  { name: 'Software Engineer', stack: 'Data Structures, Algorithms, Java/C++, System Design, OOP' },
];

function AddNewInterview({ isOpen, onClose }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("2");
  const [loading, setLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const { user } = useUser();
  const router = useRouter();

  // Sync external isOpen prop with internal state
  useEffect(() => {
    if (typeof isOpen === 'boolean') {
      setOpenDialog(isOpen);
    }
  }, [isOpen]);

  const handleOpenChange = (open) => {
    setOpenDialog(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const selectRolePreset = (role) => {
    setJobPosition(role.name);
    setJobDescription(role.stack);
    toast.success(`Selected preset: ${role.name}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGenerationStep(1);

    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1200);
  
    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}.
    Generate 5 realistic, industry-standard interview questions and answers in JSON format with an array of objects having fields "question" and "answer". Example JSON structure: { "interview_questions": [ { "question": "...", "answer": "..." } ] }`;
  
    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      
      const cleanedResponse = responseText.replace(/```json\n?|```/g, '').trim();
      let mockResponse;
      try {
        mockResponse = JSON.parse(cleanedResponse);
      } catch (parseErr) {
        // Fallback if returned directly as array or wrapped differently
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          mockResponse = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Invalid response format from AI");
        }
      }

      // Ensure standardized structure
      if (Array.isArray(mockResponse)) {
        mockResponse = { interview_questions: mockResponse };
      } else if (!mockResponse.interview_questions && Array.isArray(mockResponse.questions)) {
        mockResponse = { interview_questions: mockResponse.questions };
      }
      
      const generatedMockId = uuidv4();
      const res = await db.insert(MockInterview)
        .values({
          mockId: generatedMockId,
          jsonMockResp: JSON.stringify(mockResponse),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience.toString(),
          createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
          createdAt: moment().format('DD-MM-YYYY'),
        }).returning({ mockId: MockInterview.mockId });
      
      clearInterval(stepInterval);
      setGenerationStep(3);
      toast.success('Interview session ready!');
      handleOpenChange(false);
      router.push(`/dashboard/interview/${res[0]?.mockId || generatedMockId}`);
    } catch (error) {
      clearInterval(stepInterval);
      console.error("Error generating interview:", error);
      toast.error('Failed to generate interview questions. Please try again.');
    } finally {
      setLoading(false);
      setGenerationStep(0);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-[#0C1222]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black gradient-text-ai">
                  Setup Your AI Mock Interview
                </DialogTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Customized real-time interview simulator powered by Gemini AI
                </p>
              </div>
            </div>
          </DialogHeader>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 animate-spin flex items-center justify-center p-1">
                  <div className="w-full h-full bg-[#070B14] rounded-full flex items-center justify-center">
                    <Bot className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl animate-pulse-glow" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {generationStep === 1 && "Analyzing Job Role & Tech Requirements..."}
                  {generationStep === 2 && "Synthesizing Core Technical & Behavioral Questions..."}
                  {generationStep >= 3 && "Configuring Real-Time Speech Studio..."}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Gemini AI is crafting 5 targeted interview scenarios with ideal model responses.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
                <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                <span>Preparing Studio Room...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 mt-2">
              {/* Quick Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  ⚡ Quick Pick Popular Roles
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_ROLES.map((role) => (
                    <button
                      type="button"
                      key={role.name}
                      onClick={() => selectRolePreset(role)}
                      className={`
                        text-xs px-3 py-1.5 rounded-xl border transition-all duration-200
                        ${
                          jobPosition === role.name
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-600 dark:text-cyan-300 font-semibold'
                            : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-cyan-500/30'
                        }
                      `}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Position Input */}
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-cyan-500" />
                  <span>Target Job Role / Title</span>
                </label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer, AI Specialist, DevOps Lead"
                  value={jobPosition}
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900/60 border-slate-300 dark:border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm h-11"
                />
              </div>

              {/* Tech Stack Input */}
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-purple-500" />
                  <span>Tech Stack & Key Topics</span>
                </label>
                <Textarea
                  placeholder="e.g. React 18, Next.js App Router, TypeScript, Redux, REST API, System Design"
                  value={jobDescription}
                  required
                  rows={3}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900/60 border-slate-300 dark:border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm resize-none"
                />
              </div>

              {/* Experience Level */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Years of Experience ({jobExperience} {parseInt(jobExperience) === 1 ? 'Year' : 'Years'})</span>
                  </label>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    {parseInt(jobExperience) <= 1 ? 'Entry / Junior' : parseInt(jobExperience) <= 4 ? 'Mid-Level' : 'Senior / Lead'}
                  </span>
                </div>
                <Input
                  type="number"
                  min="0"
                  max="40"
                  value={jobExperience}
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900/60 border-slate-300 dark:border-white/10 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm h-11"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleOpenChange(false)}
                  className="rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !jobPosition || !jobDescription}
                  className="rounded-xl px-6 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Interview
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewInterview;