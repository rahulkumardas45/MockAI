"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Trash2 } from "lucide-react";

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 I am your Mock AI Assistant. How can I help you today? You can ask me anything about your resume, mock interview preparation, or general coding questions!"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    const toggleChat = () => setIsOpen((prev) => !prev);

    const handleClearChat = () => {
        setMessages([
            {
                sender: "bot",
                text: "Chat cleared! Feel free to ask any question about resumes, interviews, or career advice."
            }
        ]);
    };

    const handleSend = async (e) => {
        e?.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMsg = { sender: "user", text: trimmed };
        const updatedMessages = [...messages, userMsg];

        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages,
                    userMessage: trimmed,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to get response from AI");
            }

            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: data.reply }
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: `⚠️ Sorry, I encountered an issue: ${error.message || "Something went wrong"}. Please try again.`
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to format basic markdown-style text like bold and linebreaks
    const formatMessageText = (text) => {
        return text.split("\n").map((line, idx) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <span key={idx} className="block min-h-[1.1rem]">
                    {parts.map((part, pIdx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return (
                                <strong key={pIdx} className="font-semibold">
                                    {part.slice(2, -2)}
                                </strong>
                            );
                        }
                        return part;
                    })}
                </span>
            );
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end">
            {/* Chat Modal Window */}
            {isOpen && (
                <div className="mb-4 w-[360px] sm:w-[400px] h-[520px] max-h-[80vh] bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">

                    {/* Header */}
                    <div className="px-4 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                    <Bot size={20} />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-purple-600 rounded-full"></span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-semibold text-sm leading-tight">AI Assistant</h3>
                                    <Sparkles size={13} className="text-yellow-300" />
                                </div>
                                <p className="text-[11px] text-purple-100 font-medium">Online</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleClearChat}
                                title="Clear chat history"
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button
                                onClick={toggleChat}
                                title="Close chat"
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 dark:bg-[#070B14]">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {msg.sender === "bot" && (
                                    <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-300 text-xs flex-shrink-0 mb-1">
                                        <Bot size={14} />
                                    </div>
                                )}

                                <div
                                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === "user"
                                            ? "bg-purple-600 text-white rounded-br-xs shadow-md"
                                            : "bg-white dark:bg-[#131826] text-slate-800 dark:text-slate-100 border border-gray-200/80 dark:border-gray-800/80 rounded-bl-xs shadow-sm"
                                        }`}
                                >
                                    {formatMessageText(msg.text)}
                                </div>

                                {msg.sender === "user" && (
                                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs flex-shrink-0 mb-1 shadow-sm">
                                        <User size={14} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing / Loading indicator */}
                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-300 text-xs flex-shrink-0">
                                    <Bot size={14} />
                                </div>
                                <div className="px-3.5 py-2.5 bg-white dark:bg-[#131826] border border-gray-200/80 dark:border-gray-800/80 rounded-2xl rounded-bl-xs shadow-sm flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                    <Loader2 size={13} className="animate-spin text-purple-600" />
                                    <span>AI is thinking...</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick suggestion prompt pills when only greeting exists */}
                    {messages.length <= 1 && (
                        <div className="px-3 py-2 bg-slate-100/70 dark:bg-[#0B0F19] border-t border-gray-200/60 dark:border-gray-800 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
                            {[
                                "How do mock interviews work?",
                                "Analyze my resume score",
                                "Top behavioral interview tips",
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setInput(suggestion);
                                    }}
                                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Form */}
                    <form
                        onSubmit={handleSend}
                        className="p-3 bg-white dark:bg-[#0B0F19] border-t border-gray-200 dark:border-gray-800 flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about resume, interviews..."
                            disabled={isLoading}
                            className="flex-1 px-3.5 py-2 text-sm bg-slate-100 dark:bg-[#151B2B] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-transparent focus:border-purple-500 transition-all disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-md transition-all flex items-center justify-center flex-shrink-0 active:scale-95"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </form>

                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                onClick={toggleChat}
                aria-label="Toggle AI Chat"
                className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
            >
                {/* Ping pulse animation */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] font-bold items-center justify-center text-black">
                            AI
                        </span>
                    </span>
                )}
                {isOpen ? (
                    <X size={24} className="transition-transform duration-200 group-hover:rotate-90" />
                ) : (
                    <MessageCircle size={26} className="transition-transform duration-200 group-hover:scale-110" />
                )}
            </button>
        </div>
    );
}