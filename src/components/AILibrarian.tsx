"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Sparkles, BookOpen, Download, Search, RefreshCw, Heart, Zap, Brain, Target, MessageCircle, ArrowRight, Star, GraduationCap } from "lucide-react";
import { bookDatabase } from "@/data/books";

const AILibrarian = () => {
  const [feeling, setFeeling] = useState("");
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [recommendation, setRecommendation] = useState<any>(null);

  const performAIAnalysis = () => {
    if (!feeling.trim()) return;
    setStatus('analyzing');
    
    setTimeout(() => {
      const input = feeling.toLowerCase();
      let bestMatch = null;
      let highestScore = -1;

      // Scan all 100 books for the best sentiment match
      bookDatabase.forEach(book => {
        let currentScore = 0;
        book.moods.forEach(mood => {
          if (input.includes(mood.toLowerCase())) currentScore += 1;
        });
        
        if (currentScore > highestScore) {
          highestScore = currentScore;
          bestMatch = book;
        }
      });

      setRecommendation(bestMatch || bookDatabase[Math.floor(Math.random() * bookDatabase.length)]);
      setStatus('result');
    }, 3500);
  };

  const getLibGenLink = (title: string) => `https://libgen.is/search.php?req=${encodeURIComponent(title)}&column=title`;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass rounded-[3rem] p-12 text-center shadow-2xl">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-indigo-500/20">
              <Library size={48} />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.85]">AI <span className="text-gradient">LIBRARIAN</span></h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Describe your current state of mind. Our engine will search 100+ high-impact books to find your perfect literary mentor.
            </p>
            
            <div className="relative mb-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition-opacity" />
              <textarea 
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Example: I'm feeling a bit overwhelmed by a new leadership role and need to build confidence..."
                className="relative w-full glass p-10 rounded-[2.5rem] h-56 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-xl resize-none placeholder:opacity-30 text-slate-900 dark:text-white"
              />
              <div className="absolute bottom-8 right-10 flex gap-2">
                <Sparkles className="text-indigo-500 animate-pulse" />
              </div>
            </div>

            <button 
              onClick={performAIAnalysis}
              disabled={!feeling.trim()}
              className="bg-indigo-600 text-white px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all hover:shadow-[0_20px_50px_rgba(99,102,241,0.4)] flex items-center gap-4 mx-auto disabled:opacity-50 hover:scale-105 active:scale-95"
            >
              Consult the AI Librarian
            </button>
          </motion.div>
        )}

        {status === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-[3rem] p-32 text-center flex flex-col items-center">
            <div className="relative w-32 h-32 mx-auto mb-12">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="w-full h-full border-4 border-indigo-500/10 border-t-indigo-500 rounded-full" />
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500" size={40} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 leading-none">Deep Sentiment Scan...</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Cross-referencing 100+ world-class mentors</p>
          </motion.div>
        )}

        {status === 'result' && recommendation && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(99,102,241,0.15)]">
            <div className={`h-4 bg-gradient-to-r ${recommendation.color || 'from-indigo-500 to-purple-600'}`} />
            <div className="p-12 md:p-24 text-center">
              
              <div className="flex justify-center gap-4 mb-10">
                <span className="px-4 py-2 glass rounded-full text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2 border-white/20">
                  <Star size={12} fill="currentColor" /> {recommendation.category}
                </span>
                <span className="px-4 py-2 glass rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 border-white/20">
                  <GraduationCap size={12} /> {recommendation.englishLevel} English
                </span>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.6em] text-indigo-500 mb-6">Discovery Complete</p>
              <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] text-slate-900 dark:text-white">
                {recommendation.title}
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-slate-400 mb-16 tracking-tight uppercase">by {recommendation.author}</p>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 mb-16 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-indigo-500 group-hover:opacity-10 transition-opacity"><Brain size={200} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-6 flex items-center gap-2">
                   <Zap size={14} fill="currentColor" /> AI Clinical Reasoning
                </h4>
                <p className="text-2xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed italic relative z-10">
                  &quot;{recommendation.reason}&quot;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href={getLibGenLink(recommendation.title)} 
                  target="_blank"
                  className="bg-indigo-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(99,102,241,0.4)]"
                >
                  <Download size={24} />
                  Claim Digital Copy
                </a>
                <button 
                  onClick={() => { setStatus('idle'); setFeeling(""); setRecommendation(null); }}
                  className="glass px-12 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-900 dark:text-white border-white/20"
                >
                  <RefreshCw size={24} />
                  Analyze New State
                </button>
              </div>

              {/* Enhanced Pipeline */}
              <div className="mt-24 p-12 bg-slate-950 text-white rounded-[4rem] text-center shadow-2xl relative overflow-hidden border border-white/10">
                <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Elevate your English with this book</h4>
                <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-medium">
                  This book is rated as <span className="text-indigo-400 font-black underline decoration-indigo-500/30">{recommendation.englishLevel}</span>. 
                  Book a specialized Literary Coaching session to master its vocabulary and accelerate your career.
                </p>
                <a href={`https://wa.me/923120295549?text=I%20want%20to%20master%20the%20English%20of%20the%20book%20${encodeURIComponent(recommendation.title)}.`} className="bg-indigo-600 text-white px-12 py-6 rounded-2xl font-black text-xl inline-flex items-center gap-4 hover:bg-indigo-700 transition-all">
                   Start Literary Training <ArrowRight />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AILibrarian;
