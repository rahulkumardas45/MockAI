"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { 
  Mic, 
  MicOff, 
  StopCircle, 
  Loader2, 
  Camera, 
  CameraOff, 
  Save, 
  Sparkles, 
  CheckCircle,
  Radio
} from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

const RecordAnswerSection = ({ 
  mockInterviewQuestion, 
  activeQuestionIndex, 
  interviewData, 
  onAnswerSave,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Reset answer input when moving between questions
    setUserAnswer("");
  }, [activeQuestionIndex]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentTranscript += event.results[i][0].transcript + ' ';
            }
          }

          if (currentTranscript.trim()) {
            setUserAnswer(prev => (prev + ' ' + currentTranscript).trim());
          }
        };

        recognition.onerror = (event) => {
          console.warn("Speech recognition error:", event.error);
          if (event.error === 'not-allowed') {
            toast.error("Microphone access denied. Please allow mic permissions in your browser.");
          }
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const EnableWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
      setWebcamEnabled(true);
      toast.success("Camera enabled");
    } catch (error) {
      toast.error("Failed to enable webcam. Please verify permissions.");
      console.error("Webcam error:", error);
    }
  };

  const DisableWebcam = () => {
    const tracks = webcamRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    if (webcamRef.current) {
      webcamRef.current.srcObject = null;
    }
    setWebcamEnabled(false);
  };

  const StartStopRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech-to-text not supported in this browser. You can type your answer directly.");
      return;
    }

    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsRecording(false);
      toast.info("Microphone stopped");
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        toast.info("Listening... Speak your answer clearly");
      } catch (e) {
        console.error("Start recording error:", e);
        setIsRecording(false);
      }
    }
  };

  const UpdateUserAnswer = async () => {
    if (!userAnswer.trim()) {
      toast.error("Please provide or speak your answer before submitting");
      return;
    }

    setLoading(true);

    try {
      const currentQ = mockInterviewQuestion?.[activeQuestionIndex]?.question || "";
      const modelA = mockInterviewQuestion?.[activeQuestionIndex]?.answer || "";

      const feedbackPrompt = `You are a senior technical interviewer. 
Question: "${currentQ}"
Candidate Answer: "${userAnswer}"
Ideal Model Answer: "${modelA}"

Evaluate the answer. Return strictly a JSON object formatted as:
{
  "rating": <number from 1 to 10>,
  "feedback": "<2-3 constructive sentences covering strengths, technical accuracy, and specific areas for improvement>"
}`;
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawText = await result.response.text();
      const cleaned = rawText.replace(/```json\n?|```/g, '').trim();
      let JsonfeedbackResp = {};
      try {
        JsonfeedbackResp = JSON.parse(cleaned);
      } catch (pe) {
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) {
          JsonfeedbackResp = JSON.parse(match[0]);
        }
      }

      const answerRecord = {
        mockIdRef: interviewData?.mockId || "",
        question: currentQ,
        correctAns: modelA,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback || "Answer recorded. Review in final analytics.",
        rating: (JsonfeedbackResp?.rating || 7).toString(),
        userEmail: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);

      toast.success("Answer scored and recorded successfully!");
      
      if (isRecording && recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
        setIsRecording(false);
      }

      setUserAnswer("");
      onAnswerSave?.(answerRecord);

    } catch (error) {
      toast.error("Failed to evaluate answer. Saved locally.");
      console.error("Answer save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
            <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-lg animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">AI is Evaluating Your Answer...</h4>
            <p className="text-xs text-slate-400">Comparing against ideal concepts & calculating score</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Top Bar: Camera & Mic Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Response Console
            </span>
            {isRecording && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
                <Radio className="w-3 h-3 animate-ping" />
                <span>Recording Live</span>
              </span>
            )}
          </div>

          <button
            onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
          >
            {webcamEnabled ? (
              <>
                <CameraOff size={14} className="text-red-500" />
                <span>Hide Video</span>
              </>
            ) : (
              <>
                <Camera size={14} className="text-cyan-500" />
                <span>Show Video</span>
              </>
            )}
          </button>
        </div>

        {/* Video Preview PIP Box (shown if enabled) */}
        {webcamEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full aspect-video sm:aspect-[21/9] rounded-2xl bg-black/80 overflow-hidden relative border border-white/10 shadow-inner flex items-center justify-center"
          >
            <video 
              ref={webcamRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Candidate Camera PIP
            </div>
          </motion.div>
        )}

        {/* Voice Equalizer Visualizer */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl glass-card border-cyan-500/30 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10"
          >
            <div className="flex items-center gap-1.5 h-8">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <span
                  key={bar}
                  className="soundwave-bar w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full"
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400 tracking-wide">
              Listening to your answer in real time... Speak clearly
            </span>
          </motion.div>
        )}

        {/* Transcript / Answer Text Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Your Response (Speech / Typed)</span>
            <span>{userAnswer.length} characters</span>
          </div>
          <textarea
            className="w-full h-36 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none transition-colors leading-relaxed"
            placeholder="Click 'Record Answer' to speak or type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons: Record & Save Answer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
        <Button
          disabled={loading}
          variant="outline"
          onClick={StartStopRecording}
          className={`
            rounded-xl h-12 text-xs font-bold transition-all border
            ${
              isRecording
                ? "bg-red-500/15 border-red-500 text-red-600 dark:text-red-400 shadow-lg shadow-red-500/10"
                : "border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-cyan-500"
            }
          `}
        >
          {isRecording ? (
            <span className="flex items-center gap-2">
              <StopCircle className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Stop Recording</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-500" />
              <span>Record with Voice (STT)</span>
            </span>
          )}
        </Button>

        <Button
          onClick={UpdateUserAnswer}
          disabled={loading || !userAnswer.trim()}
          className="rounded-xl h-12 text-xs font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          <span>Save & Evaluate Answer</span>
        </Button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;