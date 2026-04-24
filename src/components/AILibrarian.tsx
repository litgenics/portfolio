"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Sparkles, BookOpen, Download, Search, RefreshCw, Heart, Zap, Brain, Target } from "lucide-react";

const bookData = [
  { mood: "anxious", title: "Meditations", author: "Marcus Aurelius", desc: "Timeless stoic wisdom to find calm in chaos.", color: "from-blue-500 to-cyan-600" },
  { mood: "unmotivated", title: "Can't Hurt Me", author: "David Goggins", desc: "Master your mind and defy the odds.", color: "from-orange-600 to-red-700" },
  { mood: "lost", title: "The Alchemist", author: "Paulo Coelho", desc: "A beautiful fable about following your personal legend.", color: "from-yellow-400 to-amber-600" },
  { mood: "overwhelmed", title: "Essentialism", author: "Greg McKeown", desc: "The disciplined pursuit of less.", color: "from-slate-700 to-slate-900" },
  { mood: "curious", title: "Sapiens", author: "Yuval Noah Harari", desc: "A brief history of humankind and our evolution.", color: "from-indigo-500 to-purple-600" },
  { mood: "sad", title: "Man's Search for Meaning", author: "Viktor Frankl", desc: "Finding hope even in the darkest circumstances.", color: "from-emerald-500 to-teal-700" },
  { mood: "ambitious", title: "Atomic Habits", author: "James Clear", desc: "Small changes, remarkable results for your career.", color: "from-indigo-600 to-blue-700" },
  { mood: "creative", title: "Big Magic", author: "Elizabeth Gilbert", desc: "Creative living beyond fear.", color: "from-pink-500 to-rose-600" }
];

const AILibrarian = () => {
  const [feeling, setFeeling] = useState("");
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [recommendation, setResult] = useState<any>(null);

  const analyzeFeeling = () => {
    if (!feeling.trim()) return;
    setStatus('analyzing');
    
    // Simulate AI analysis time
    setTimeout(() => {
      const input = feeling.toLowerCase();
      // Basic keyword matching logic
      const found = bookData.find(b => input.includes(b.mood)) || bookData[Math.floor(Math.random() * bookData.length)];
      setResult(found);
      setStatus('result');
    }, 2500);
  };

  const getLibGenLink = (title: string) => `https://libgen.is/search.php?req=${encodeURIComponent(title)}&column=title`;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[3rem] p-12 text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <Library size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">AI <span className="text-gradient">LIBRARIAN</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-10 max-w-lg mx-auto">
              Tell me how you are feeling today, and I will recommend the perfect book to guide your mind.
            </p>
            
            <div className="relative mb-8">
              <textarea 
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Example: I'm feeling a bit overwhelmed with work and need some focus..."
                className="w-full glass p-8 rounded-[2rem] h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg resize-none"
              />
              <div className="absolute bottom-6 right-8 flex gap-2">
                <Sparkles className="text-indigo-500 animate-pulse" />
              </div>
            </div>

            <button 
              onClick={analyzeFeeling}
              disabled={!feeling.trim()}
              className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-3 mx-auto disabled:opacity-50"
            >
              Analyze Mood & Suggest Book
            </button>
          </motion.div>
        )}

        {status === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-[3rem] p-24 text-center flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <RefreshCw size={60} className="text-indigo-500" />
            </motion.div>
            <h3 className="text-2xl font-black uppercase tracking-widest">Scanning Literary Database...</h3>
            <p className="text-slate-500 mt-4 font-bold">Matching your emotions with high-impact literature.</p>
          </motion.div>
        )}

        {status === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] overflow-hidden"
          >
            <div className={`h-4 bg-gradient-to-r ${recommendation.color}`} />
            <div className="p-12 md:p-20 text-center">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 mb-4">Recommended for your mood</p>
              <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-tight">
                {recommendation.title}
              </h2>
              <p className="text-2xl font-bold text-slate-500 mb-8">by {recommendation.author}</p>
              
              <div className="max-w-xl mx-auto mb-12">
                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                  "{recommendation.desc}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href={getLibGenLink(recommendation.title)} 
                  target="_blank"
                  className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30"
                >
                  <Download size={20} />
                  Get via LibGen
                </a>
                <button 
                  onClick={() => { setStatus('idle'); setFeeling(""); }}
                  className="glass px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <RefreshCw size={20} />
                  Try Another Mood
                </button>
              </div>
              
              <p className="mt-12 text-xs font-bold uppercase tracking-widest text-slate-400 opacity-60">
                LITGENICS LITERARY RECOMMENDATION ENGINE v1.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AILibrarian;
