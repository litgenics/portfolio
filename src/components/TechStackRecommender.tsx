"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Rocket, Shield, Zap, Globe, ShoppingCart, Cpu, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: 1,
    q: "What is the primary goal of your project?",
    options: [
      { label: "E-Commerce Store", value: "ecommerce", icon: <ShoppingCart /> },
      { label: "SaaS / Web App", value: "saas", icon: <Layers /> },
      { label: "Content / Blog", value: "blog", icon: <Globe /> },
      { label: "Internal Business Tool", value: "internal", icon: <Cpu /> }
    ]
  },
  {
    id: 2,
    q: "What is your expected initial traffic scale?",
    options: [
      { label: "MVP (testing the waters)", value: "mvp", icon: <Rocket /> },
      { label: "Medium (10k+ users/mo)", value: "scale", icon: <Zap /> },
      { label: "Enterprise (High reliability)", value: "enterprise", icon: <Shield /> }
    ]
  },
  {
    id: 3,
    q: "What is your priority for development?",
    options: [
      { label: "Speed to Market", value: "speed" },
      { label: "Performance & SEO", value: "perf" },
      { label: "Customizability", value: "custom" }
    ]
  }
];

const recommendations = {
  ecommerce: {
    title: "Headless Shopify + Next.js",
    desc: "The ultimate combo for high-performance e-commerce. Next.js handles the frontend for lightning speed and SEO, while Shopify manages the heavy lifting of commerce logic.",
    stack: ["Next.js", "Tailwind CSS", "Shopify Storefront API", "Vercel"]
  },
  saas: {
    title: "T3 Stack (Next.js + TypeScript + tRPC)",
    desc: "A developer-first stack that ensures type-safety from database to frontend. Perfect for complex SaaS applications that need to scale efficiently.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "PostgreSQL"]
  },
  blog: {
    title: "Next.js + Contentlayer (Static)",
    desc: "Maximum speed and perfect SEO. By generating static pages from Markdown or a Headless CMS, your blog will load instantly everywhere.",
    stack: ["Next.js", "Contentlayer", "Markdown/MDX", "Vercel"]
  },
  internal: {
    title: "React + Supabase / Retool",
    desc: "For internal tools, speed of development and data management are key. Supabase provides a powerful backend with minimal setup.",
    stack: ["React", "Supabase", "Tailwind CSS", "React Query"]
  }
};

const TechStackRecommender = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const type = answers[1] as keyof typeof recommendations;
    return recommendations[type] || recommendations.saas;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[3rem] p-10 md:p-14"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Step {step + 1} of 3</span>
              <div className="h-1.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / 3) * 100}%` }}
                  className="h-full bg-indigo-600"
                />
              </div>
            </div>

            <h3 className="text-3xl font-black mb-10 tracking-tight leading-tight">
              {questions[step].q}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.value)}
                  className="group w-full text-left p-8 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {opt.icon && <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">{opt.icon}</div>}
                    <span className="font-black text-lg">{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] p-10 md:p-14"
          >
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 size={40} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">Your Recommended Stack</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">{getRecommendation().title}</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {getRecommendation().desc}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {getRecommendation().stack.map((tech, i) => (
                <div key={i} className="p-4 rounded-2xl glass border border-slate-100 dark:border-slate-800 text-center font-black text-sm uppercase tracking-tighter">
                  {tech}
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 text-center relative overflow-hidden">
              <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Need a Custom Roadmap?</h4>
              <p className="text-slate-400 font-medium mb-8">
                We've built dozens of projects using this exact stack. Get a detailed technical proposal and timeline for your specific project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                  Request Architecture Plan
                </button>
                <button 
                  onClick={() => { setStep(0); setShowResult(false); setAnswers({}); }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl glass font-black uppercase tracking-widest hover:bg-white/10 transition-all mx-auto sm:mx-0"
                >
                  <RefreshCw size={18} /> Restart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechStackRecommender;
