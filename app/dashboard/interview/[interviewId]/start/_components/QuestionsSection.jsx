"use client";

import { Lightbulb, Volume2, VolumeX, Sparkles, HelpCircle } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex, onSelectIndex }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser does not support text to speech");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.95;
    speech.pitch = 1;
    
    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const currentQuestion = mockInterviewQuestion?.[activeQuestionIndex]?.question || "";

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-6">
        {/* Question Stepper Pills */}
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block mb-3">
            Question Selector
          </span>
          <div className="flex flex-wrap gap-2">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => {
                const isActive = activeQuestionIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => onSelectIndex && onSelectIndex(index)}
                    className={`
                      px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 scale-105"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10"
                      }
                    `}
                  >
                    Q#{index + 1}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Current Question Box */}
        <motion.div
          key={activeQuestionIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-2"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Prompt #{activeQuestionIndex + 1}</span>
            </span>

            {/* Audio TTS Button */}
            <button
              onClick={() => textToSpeech(currentQuestion)}
              className={`
                flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all
                ${
                  isSpeaking
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-500 dark:text-cyan-300 animate-pulse"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-cyan-500/40"
                }
              `}
              title="Listen to Question"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-cyan-500" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-500" />
                  <span>Listen to Question</span>
                </>
              )}
            </button>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQuestion}
          </h3>
        </motion.div>
      </div>

      {/* Pro Tip Card */}
      <div className="glass-card rounded-2xl p-5 border-cyan-500/20 bg-cyan-500/5 space-y-2 mt-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs">
          <Lightbulb className="w-4 h-4" />
          <span>Pro Interview Tip</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Structure your answer using the <strong>STAR method</strong> (Situation, Task, Action, Result). 
          Speak clearly and state trade-offs whenever discussing architecture or algorithms.
        </p>
      </div>
    </div>
  );
};

export default QuestionsSection;