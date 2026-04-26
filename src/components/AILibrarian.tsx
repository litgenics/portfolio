"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Sparkles, BookOpen, Download, Search, RefreshCw, Heart, Zap, Brain, Target, MessageCircle, ArrowRight } from "lucide-react";

// Expanded Emotional Intelligence Database
const bookDatabase = [
  { 
    moods: ["anxious", "stressed", "worried", "nervous", "pressure", "overthinking"],
    title: "Meditations", 
    author: "Marcus Aurelius", 
    reason: "Stoic philosophy specifically designed to differentiate between what you can control and what you cannot.",
    desc: "Timeless stoic wisdom to find calm in chaos.", 
    color: "from-blue-500 to-cyan-600" 
  },
  { 
    moods: ["unmotivated", "lazy", "stuck", "procrastinating", "tired", "quit"],
    title: "Can't Hurt Me", 
    author: "David Goggins", 
    reason: "Uses high-intensity mental toughness strategies to break through self-imposed limits.",
    desc: "Master your mind and defy the odds.", 
    color: "from-orange-600 to-red-700" 
  },
  { 
    moods: ["lost", "purpose", "meaning", "direction", "confused", "future"],
    title: "The Alchemist", 
    author: "Paulo Coelho", 
    reason: "A metaphorical guide to listening to your heart and recognizing omens on your personal legend.",
    desc: "A beautiful fable about following your personal legend.", 
    color: "from-yellow-400 to-amber-600" 
  },
  { 
    moods: ["overwhelmed", "busy", "distracted", "cluttered", "chaos"],
    title: "Essentialism", 
    author: "Greg McKeown", 
    reason: "Teaches the 'disciplined pursuit of less' to regain control of your choices and energy.",
    desc: "The disciplined pursuit of less.", 
    color: "from-slate-700 to-slate-900" 
  },
  { 
    moods: ["sad", "depressed", "unhappy", "grief", "pain", "darkness"],
    title: "Man's Search for Meaning", 
    author: "Viktor Frankl", 
    reason: "Psychological insights from a Holocaust survivor on finding purpose even in extreme suffering.",
    desc: "Finding hope even in the darkest circumstances.", 
    color: "from-emerald-500 to-teal-700" 
  },
  { 
    moods: ["ambitious", "growth", "productive", "success", "money", "career"],
    title: "Atomic Habits", 
    author: "James Clear", 
    reason: "Provides a scientific framework for building 1% improvements that lead to massive long-term results.",
    desc: "Small changes, remarkable results for your career.", 
    color: "from-indigo-600 to-blue-700" 
  },
  { 
    moods: ["creative", "idea", "artist", "block", "innovation"],
    title: "Big Magic", 
    author: "Elizabeth Gilbert", 
    reason: "Unlocks the courage to pursue creative endeavors without the fear of judgment.",
    desc: "Creative living beyond fear.", 
    color: "from-pink-500 to-rose-600" 
  }
];

const AILibrarian = () => {
  const [feeling, setFeeling] = useState("");
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [recommendation, setRecommendation] = useState<any>(null);

  const performAIAnalysis = () => {
    if (!feeling.trim()) return;
    setStatus('analyzing');
    
    setTimeout(() => {
      const input = feeling.toLowerCase();
      
      // Advanced Weighted Matching Logic
      let bestMatch = null;
      let highestScore = -1;

      bookDatabase.forEach(book => {
        let currentScore = 0;
        book.moods.forEach(mood => {
          if (input.includes(mood)) currentScore += 1;
        });
        
        if (currentScore > highestScore) {
          highestScore = currentScore;
          bestMatch = book;
        }
      });

      // Default fallback to a random high-impact book if no keywords match
      const result = bestMatch || bookDatabase[Math.floor(Math.random() * bookDatabase.length)];
      setRecommendation(result);
      setStatus('result');
    }, 3000);
  };

  const getLibGenLink = (title: string) => `https://libgen.is/search.php?req=${encodeURIComponent(title)}&column=title`;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass rounded-[3rem] p-12 text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <Library size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-slate-900 dark:text-white">AI <span className="text-gradient">LIBRARIAN</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              Tell us how you are feeling, and our engine will recommend the perfect literary companion for your current state.
            </p>
            
            <div className="relative mb-8">
              <textarea 
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Example: I'm feeling a bit burnt out and lost in my career path, I need some direction..."
                className="w-full glass p-8 rounded-[2.5rem] h-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg resize-none placeholder:opacity-30 text-slate-900 dark:text-white"
              />
              <div className="absolute bottom-6 right-8 flex gap-2">
                <Sparkles className="text-indigo-500 animate-pulse" />
              </div>
            </div>

            <button 
              onClick={performAIAnalysis}
              disabled={!feeling.trim()}
              className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-3 mx-auto disabled:opacity-50"
            >
              Analyze Emotion & Recommend
            </button>
          </motion.div>
        )}

        {status === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-[3rem] p-32 text-center flex flex-col items-center">
            <div className="relative w-24 h-24 mx-auto mb-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-full h-full border-4 border-indigo-500/20 border-t-indigo-500 rounded-full" />
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Sentiment Mapping...</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cross-referencing your state with literary psychology.</p>
          </motion.div>
        )}

        {status === 'result' && recommendation && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[4rem] overflow-hidden shadow-2xl">
            <div className={`h-4 bg-gradient-to-r ${recommendation.color}`} />
            <div className="p-12 md:p-20 text-center">
              <div className="inline-block p-4 glass rounded-3xl text-indigo-500 mb-8"><BookOpen size={40} /></div>
              <p className="text-xs font-black uppercase tracking-[0.5em] text-indigo-500 mb-4">Recommended Discovery</p>
              <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-tight text-slate-900 dark:text-white">
                {recommendation.title}
              </h2>
              <p className="text-2xl font-bold text-slate-500 mb-12 italic">by {recommendation.author}</p>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 mb-12 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-500"><Sparkles size={100} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-4 flex items-center gap-2">
                   <Zap size={14} /> AI Analysis
                </h4>
                <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic relative z-10">
                  &quot;{recommendation.reason}&quot;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href={getLibGenLink(recommendation.title)} 
                  target="_blank"
                  className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(99,102,241,0.3)]"
                >
                  <Download size={20} />
                  Get via LibGen
                </a>
                <button 
                  onClick={() => { setStatus('idle'); setFeeling(""); setRecommendation(null); }}
                  className="glass px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-900 dark:text-white border-white/20"
                >
                  <RefreshCw size={20} />
                  Analyze New Mood
                </button>
              </div>

              <div className="mt-16 p-10 border-t border-slate-100 dark:border-slate-800 text-center">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter italic text-slate-900 dark:text-white">Master the English of this book</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-lg mx-auto">
                  Improve your vocabulary and analytical skills by dissecting this book in a 1-on-1 session with Hamza.
                </p>
                <a href={`https://wa.me/923120295549?text=I%20want%20to%20study%20${encodeURIComponent(recommendation.title)}%20with%20you.`} className="inline-flex items-center gap-3 font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-sm hover:gap-6 transition-all">
                   Book Literary Coaching <ArrowRight size={18} />
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
