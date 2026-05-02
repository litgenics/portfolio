"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, CheckCircle2, AlertCircle, BarChart3, ArrowRight, RefreshCw } from "lucide-react";

const SeoHealthCheck = () => {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!url || !keyword) return;
    setIsAnalyzing(true);
    setShowResults(false);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const results = [
    { title: "Title Tag", status: "pass", desc: "Title length is optimal (55 characters)." },
    { title: "Meta Description", status: "fail", desc: "Missing meta description. Crucial for CTR." },
    { title: "Keyword Density", status: "pass", desc: "Target keyword appears 2.4% - within range." },
    { title: "H1 Header", status: "pass", desc: "Primary header contains target keyword." },
    { title: "Alt Text", status: "warn", desc: "3 images are missing descriptive alt text." },
    { title: "OG Tags", status: "fail", desc: "Open Graph tags missing for social sharing." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[3rem] p-10 md:p-14 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Target URL</label>
            <div className="relative">
              <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full pl-16 pr-6 py-5 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">Target Keyword</label>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., Software Solutions"
                className="w-full pl-16 pr-6 py-5 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !url || !keyword}
          className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/30 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isAnalyzing ? (
            <>Analyzing Site <RefreshCw className="animate-spin" /></>
          ) : (
            <>Check SEO Health <BarChart3 /></>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {showResults && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass rounded-[2.5rem] p-8 text-center bg-slate-900 text-white md:col-span-1 flex flex-col items-center justify-center">
                <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">Overall Score</p>
                <div className="text-7xl font-black mb-2 tracking-tighter">68</div>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Needs Improvement</p>
              </div>

              <div className="glass rounded-[2.5rem] p-8 md:col-span-2">
                <h4 className="text-xl font-black mb-6 uppercase tracking-tight">Technical Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((res, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 border border-slate-100 dark:border-slate-800">
                      {res.status === "pass" && <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />}
                      {res.status === "fail" && <AlertCircle className="text-red-500 shrink-0" size={20} />}
                      {res.status === "warn" && <AlertCircle className="text-yellow-500 shrink-0" size={20} />}
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight leading-none mb-1">{res.title}</p>
                        <p className="text-[11px] font-medium text-slate-500">{res.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-[3rem] p-10 md:p-14 text-center border-2 border-indigo-600/20 bg-indigo-50/30 dark:bg-indigo-950/20">
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none">
                Get a <span className="text-gradient">Professional SEO Audit</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto">
                These results are just the tip of the iceberg. Our manual technical audit covers 50+ data points to help you dominate Search.
              </p>
              <button className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40">
                Book Full Audit Call <ArrowRight className="inline ml-2" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeoHealthCheck;
