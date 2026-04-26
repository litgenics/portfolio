"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Rocket, Shield, Star, ArrowRight } from "lucide-react";

const pricingData = {
  english: [
    {
      name: "IELTS/SAT Sprint",
      price: "$199",
      period: "/course",
      desc: "Perfect for students targeting high scores in a short timeframe.",
      features: ["15 Intensive Sessions", "Mock Tests & Analysis", "Direct feedback on Writing", "Official Material Access"],
      highlight: false
    },
    {
      name: "Business Executive",
      price: "$499",
      period: "/month",
      desc: "For professionals looking to dominate global business environments.",
      features: ["1-on-1 Personalized Coaching", "Email & Presentation Review", "Advanced Vocabulary Training", "Meeting & Negotiation Practice"],
      highlight: true
    },
    {
      name: "Elite Concierge",
      price: "$999",
      period: "/month",
      desc: "Unlimited support for top-tier executives and high-net-worth individuals.",
      features: ["24/7 Priority Support", "Daily Fluency Practice", "Public Speaking Mastery", "Complete Document Ghostwriting"],
      highlight: false
    }
  ],
  software: [
    {
      name: "Growth Launchpad",
      price: "$1,499",
      period: "/project",
      desc: "Premium landing pages and advanced SEO infrastructure.",
      features: ["High-Conversion Design", "Full SEO Implementation", "Mobile Optimization", "1 Month Post-Launch Support"],
      highlight: false
    },
    {
      name: "The MVP Hub",
      price: "$4,999",
      period: "/start",
      desc: "Full-stack scalable applications built with modern tech ecosystems.",
      features: ["Custom Web Application", "Database & API Integration", "Cloud Deployment", "3 Months Security Support"],
      highlight: true
    },
    {
      name: "Enterprise Ecosystem",
      price: "Custom",
      period: "",
      desc: "Complete digital transformation for established businesses.",
      features: ["Multiple Software Modules", "Dedicated Maintenance Team", "Legacy System Migration", "Custom AI Integrations"],
      highlight: false
    }
  ]
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'english' | 'software'>('english');

  return (
    <section id="pricing" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4"
          >
            Investment Plans
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase"
          >
            SELECT YOUR <span className="text-gradient">TIER</span>
          </motion.h2>

          {/* Premium Toggle */}
          <div className="inline-flex p-2 glass rounded-3xl mb-16 border-white/20">
            <button 
              onClick={() => setActiveTab('english')}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'english' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:text-indigo-500'}`}
            >
              English Coaching
            </button>
            <button 
              onClick={() => setActiveTab('software')}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'software' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:text-indigo-500'}`}
            >
              Software Solutions
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {pricingData[activeTab].map((plan, index) => (
              <motion.div
                key={plan.name + activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass rounded-[3rem] p-10 flex flex-col ${plan.highlight ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10 z-10 scale-105' : 'border-white/20'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2">
                    <Star size={12} fill="currentColor" /> Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">{plan.period}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-6 font-medium leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mt-0.5">
                        <Check size={12} className="text-indigo-500" strokeWidth={4} />
                      </div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${plan.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white'}`}>
                  Get Started
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
