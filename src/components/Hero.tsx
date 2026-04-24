"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden bg-slate-50 dark:bg-[#020617]">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
        >
          <Sparkles size={16} className="text-yellow-500" />
          <span className="text-sm font-bold tracking-wide uppercase">Multi-Disciplinary Agency</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
        >
          WE BUILD <br />
          <span className="text-gradient">DIGITAL IMPACT</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          I&apos;m <span className="text-slate-900 dark:text-white font-bold">M.Hamza Shaikh</span>, 
          founder of <span className="text-indigo-600 font-bold">litgenics</span>. 
          Bridging the gap between professional English mastery and cutting-edge software solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a 
            href="#contact" 
            className="group bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-3"
          >
            Work with me
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#services" 
            className="flex items-center gap-3 font-bold text-slate-900 dark:text-white hover:text-indigo-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
              <Play size={18} fill="currentColor" />
            </div>
            View Services
          </a>
        </motion.div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
