"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Globe, RefreshCw, Copy, Check } from "lucide-react";

const prefixes = ["Omni", "Lumina", "Neo", "Aura", "Zen", "Velo", "Flux", "Core", "Prime", "Swift", "Nova", "Elite"];
const suffixes = ["genics", "ly", "ify", "io", "verse", "sphere", "labs", "flow", "grid", "sync", "node", "path"];
const modernBlends = ["Vantix", "Kinetix", "Zentris", "Auvora", "Nexis", "Elevat", "Stridr", "Cresta", "Volt"];

const BrandNameSuggester = () => {
  const [industry, setIndustry] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generateNames = () => {
    if (!industry.trim()) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const newNames = new Set<string>();
      // Generate 9 unique names
      while (newNames.size < 9) {
        const rand = Math.random();
        if (rand > 0.6) {
          const p = prefixes[Math.floor(Math.random() * prefixes.length)];
          const s = suffixes[Math.floor(Math.random() * suffixes.length)];
          newNames.add(p + s);
        } else if (rand > 0.3) {
          newNames.add(modernBlends[Math.floor(Math.random() * modernBlends.length)]);
        } else {
          const firstPart = industry.slice(0, 4);
          const s = suffixes[Math.floor(Math.random() * suffixes.length)];
          newNames.add(firstPart + s);
        }
      }
      setResults(Array.from(newNames));
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[3rem] p-8 md:p-16 text-center mb-12"
      >
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
          <Sparkles size={40} />
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Brand Name <br/> <span className="text-gradient">Suggester</span></h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-12 max-w-xl mx-auto">
          Enter your niche or keywords, and our linguistic engine will generate 
          modern, high-impact brand names for your next venture.
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
          <input 
            type="text" 
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g. Tech, Coaching, Fitness..."
            className="flex-1 glass px-8 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-lg"
          />
          <button 
            onClick={generateNames}
            disabled={!industry.trim() || isGenerating}
            className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="animate-spin" /> : <Zap size={20} />}
            Generate
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-3xl p-8 flex flex-col items-center justify-center group hover:bg-indigo-500/5 transition-all border-white/20"
                >
                  <h3 className="text-2xl font-black mb-6 tracking-tight group-hover:scale-110 transition-transform">{name}</h3>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => copyToClipboard(name)}
                      className="p-3 glass rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-500 hover:text-indigo-500"
                      title="Copy Name"
                    >
                      {copied === name ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                    <a 
                      href={`https://www.godaddy.com/en-pk/domain-search?domainToCheck=${name}.com`}
                      target="_blank"
                      className="p-3 glass rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-500 hover:text-indigo-500"
                      title="Check .com Availability"
                    >
                      <Globe size={18} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tool-to-Sale Pipeline: MVP Build */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 glass rounded-[3rem] border-indigo-500/20 bg-indigo-600 text-white text-center shadow-2xl shadow-indigo-500/20"
            >
              <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter">Got the perfect name?</h4>
              <p className="text-indigo-100 font-medium mb-8 max-w-xl mx-auto">
                Now build the perfect platform. Let **litgenics** turn your brand name into a high-performance 
                MVP using the latest tech stacks.
              </p>
              <a 
                href="https://wa.me/923120295549?text=I%20have%20a%20brand%20name%20and%20want%20to%20get%20a%20quote%20for%20a%20custom%20MVP."
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all"
              >
                Get Custom MVP Quote <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandNameSuggester;
