"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import AddNewInterview from "./AddNewInterview";
import { Bot, Search, Plus, Sparkles, Filter } from "lucide-react";
import { motion } from "framer-motion";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewList(result || []);
    } catch (err) {
      console.error("Error loading interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleted = (deletedMockId) => {
    setInterviewList((prev) => prev.filter((item) => item.mockId !== deletedMockId));
  };

  const filteredList = interviewList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      (item.jobPosition || "").toLowerCase().includes(query) ||
      (item.jobDesc || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Section Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            Previous Mock Interviews
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Access your practice history, replay interviews, or view detailed AI evaluations
          </p>
        </div>

        {/* Search Bar */}
        {interviewList.length > 0 && (
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 h-48 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-2/3 h-5 bg-slate-200 dark:bg-white/10 rounded-lg" />
                <div className="w-1/2 h-4 bg-slate-200 dark:bg-white/5 rounded-lg" />
              </div>
              <div className="w-full h-9 bg-slate-200 dark:bg-white/10 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((interview, index) => (
            <InterviewItemCard
              key={interview.mockId || index}
              interview={interview}
              onDeleteSuccess={handleDeleted}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-3xl p-10 text-center max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 border border-dashed border-slate-300 dark:border-white/15"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
            <Bot size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {searchQuery ? "No matching interviews found" : "No mock interviews yet"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              {searchQuery
                ? "Try searching for a different keyword or clear your search."
                : "Create your first AI mock interview tailored to your target job role."}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Interview</span>
            </button>
          )}

          <AddNewInterview
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              GetInterviewList();
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default InterviewList;