"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Mail, RefreshCw, Copy, Check } from "lucide-react";

const refinements: Record<string, string> = {
  "want": "would like to request",
  "help": "assist",
  "fix": "rectify",
  "get": "obtain",
  "tell": "inform",
  "think": "believe",
  "sorry": "apologize",
  "need": "require",
  "show": "demonstrate",
  "check": "verify"
};

const AIWritingRefiner = () => {
  const [input, setInput] = useState("");
  const [refined, setRefined] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRefine = () => {
    if (!input.trim()) return;
    setIsRefining(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      let result = input;
      Object.entries(refinements).forEach(([key, val]) => {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        result = result.replace(regex, val);
      });

      if (result === input) {
        result = "I am writing to " + input.charAt(0).toLowerCase() + input.slice(1) + ". I would appreciate your assistance in this matter.";
      }

      setRefined(result);
      setIsRefining(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[2rem] p-8"
        >
          <h3 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
            <span className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-sm">1</span>
            Your Draft
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I want to talk about the project help..."
            className="w-full h-64 p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg resize-none"
          />
          <button
            onClick={handleRefine}
            disabled={isRefining || !input.trim()}
            className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isRefining ? (
              <>Refining... <RefreshCw className="animate-spin" /></>
            ) : (
              <>Refine Professionally <Sparkles size={20} /></>
            )}
          </button>
        </motion.div>

        {/* Output Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[2rem] p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <Sparkles className="text-indigo-500/20" size={120} />
          </div>
          
          <h3 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
            AI Refinement
          </h3>
          
          <div className="w-full h-64 p-6 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 font-medium text-lg relative group">
            <AnimatePresence mode="wait">
              {refined ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed italic">
                    "{refined}"
                  </p>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute bottom-4 right-4 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                  >
                    {copied ? <Check className="text-green-500" size={20} /> : <Copy size={20} />}
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                  <Sparkles size={40} className="mb-4 opacity-20" />
                  <p>Your polished text will <br/> appear here</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 bg-slate-900 text-white p-6 rounded-2xl">
            <h4 className="font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
              <Mail size={16} className="text-indigo-400" /> Professional Review
            </h4>
            <p className="text-xs text-slate-400 font-medium mb-4">
              AI is a start, but human nuance closes deals. Get a manual review of your important documents.
            </p>
            <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-indigo-50 transition-colors">
              Book a 15-min Doc Audit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIWritingRefiner;
