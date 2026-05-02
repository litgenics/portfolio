"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, Pause, RotateCcw, Timer, Trophy, MessageSquare } from "lucide-react";

const categories = {
  "IELTS Part 2": [
    "Describe a time when you received a useful piece of advice. You should say: who gave it to you, what the advice was, and explain why it was useful.",
    "Describe a piece of technology you own that you find difficult to use. You should say: what it is, when you got it, and explain why it is difficult to use.",
    "Describe a beautiful place you have visited. You should say: where it is, when you went there, and explain why it is beautiful."
  ],
  "Business Meetings": [
    "You disagree with a colleague's proposal during a high-stakes meeting. How do you voice your concern professionally without offending them?",
    "A project is behind schedule. Explain the situation to your manager and propose a recovery plan.",
    "Introduce a new team member to the department, highlighting their expertise and how they will contribute."
  ],
  "Presentations": [
    "Open a presentation about a 20% decline in quarterly sales. How do you frame the data to focus on future solutions?",
    "Explain a complex technical concept to a non-technical audience (e.g., Explain Cloud Computing to a CEO).",
    "Close a pitch for a new product, including a strong call to action and a summary of key benefits."
  ]
};

const SpeakingPrompts = () => {
  const [category, setCategory] = useState<keyof typeof categories>("IELTS Part 2");
  const [prompt, setPrompt] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isActive, setIsActive] = useState(false);

  const generatePrompt = () => {
    const list = categories[category];
    const newPrompt = list[Math.floor(Math.random() * list.length)];
    setPrompt(newPrompt);
    setTimeLeft(category === "IELTS Part 2" ? 120 : 60);
    setIsActive(false);
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat as keyof typeof categories);
              setPrompt("");
              setIsActive(false);
            }}
            className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              category === cat 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/30" 
                : "glass text-slate-500 hover:text-indigo-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Prompt Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 glass rounded-[3rem] p-10 md:p-14 relative overflow-hidden min-h-[400px] flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <MessageSquare size={200} />
          </div>

          <div className="relative">
            <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em] mb-6">Current Prompt</p>
            {prompt ? (
              <motion.h3 
                key={prompt}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight tracking-tight"
              >
                "{prompt}"
              </motion.h3>
            ) : (
              <div className="text-slate-400 font-bold text-xl italic">
                Click "Generate Prompt" to begin your practice session.
              </div>
            )}
          </div>

          <button 
            onClick={generatePrompt}
            className="mt-12 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-600 transition-all w-fit"
          >
            Generate Prompt
          </button>
        </motion.div>

        {/* Timer Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] p-10 text-center flex flex-col items-center justify-center border-2 border-indigo-100 dark:border-indigo-900/30"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-colors ${isActive ? "bg-indigo-600 text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
            <Timer size={40} />
          </div>
          
          <div className="text-5xl font-black tracking-tighter text-slate-800 dark:text-white mb-2 font-mono">
            {formatTime(timeLeft)}
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Practice Time</p>

          <div className="flex gap-4 w-full">
            <button 
              disabled={!prompt}
              onClick={() => setIsActive(!isActive)}
              className={`flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"}`}
            >
              {isActive ? <><Pause size={20} /> Stop</> : <><Play size={20} /> Start</>}
            </button>
            <button 
              onClick={() => { setIsActive(false); setTimeLeft(category === "IELTS Part 2" ? 120 : 60); }}
              className="p-4 rounded-xl glass hover:text-indigo-600 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center gap-8 bg-indigo-600 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-transparent opacity-50" />
        <div className="relative z-10 md:flex-1">
          <h3 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">
            Get your <span className="text-yellow-400">Speaking Score</span>
          </h3>
          <p className="text-indigo-100 text-lg font-medium opacity-80">
            Record your answer and send it to us via WhatsApp. Hamza will provide a **Free Pronunciation & Fluency Audit** within 24 hours.
          </p>
        </div>
        <button className="relative z-10 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl">
          Start Audio Audit <Mic size={24} />
        </button>
      </div>
    </div>
  );
};

export default SpeakingPrompts;
