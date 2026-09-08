"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import { Trash2, Play, BarChart2, Calendar, Briefcase, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const InterviewItemCard = ({ interview, onDeleteSuccess }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  const onDelete = async () => {
    try {
      setDeleting(true);
      await db.delete(MockInterview).where(eq(MockInterview.mockId, interview?.mockId));
      
      setIsDialogOpen(false);
      toast.success("Interview deleted successfully");
      if (onDeleteSuccess) {
        onDeleteSuccess(interview?.mockId);
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    } finally {
      setDeleting(false);
    }
  };

  // Parse tech stack preview tags
  const techTags = (interview?.jobDesc || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="
        glass-card
        rounded-2xl
        p-5
        relative
        flex
        flex-col
        justify-between
        h-full
        group
        hover:-translate-y-1.5
        transition-all
        duration-300
      "
    >
      {/* Glow Highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

      {/* Top Row: Role + Delete Button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 flex-shrink-0">
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                {interview?.jobPosition}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {interview?.jobExperience} {parseInt(interview?.jobExperience) === 1 ? 'yr' : 'yrs'} exp
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {interview?.createdAt}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Delete Interview"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
          {techTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
          {(interview?.jobDesc || "").split(",").length > 3 && (
            <span className="px-2 py-0.5 rounded-lg text-[11px] text-slate-400 font-mono">
              +{(interview?.jobDesc || "").split(",").length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-white/5">
        <Button
          size="sm"
          variant="outline"
          className="rounded-xl text-xs font-semibold border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center gap-1.5 h-9"
          onClick={onFeedbackPress}
        >
          <BarChart2 className="w-3.5 h-3.5 text-purple-500" />
          <span>Feedback</span>
        </Button>

        <Button
          size="sm"
          className="rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 hover:opacity-90 flex items-center justify-center gap-1.5 h-9"
          onClick={onStart}
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Practice</span>
        </Button>
      </div>

      {/* Modern Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel bg-white dark:bg-[#0F172A] rounded-3xl p-6 max-w-sm w-full border border-slate-200 dark:border-white/10 space-y-4 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto">
              <Trash2 size={24} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Mock Session?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Are you sure you want to delete <strong className="text-slate-800 dark:text-slate-200">{interview?.jobPosition}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="rounded-xl text-xs font-semibold"
                onClick={() => setIsDialogOpen(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
                onClick={onDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default InterviewItemCard;