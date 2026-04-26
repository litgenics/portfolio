"use client";

import { motion } from "framer-motion";
import { Quote, Star, User, Briefcase, GraduationCap } from "lucide-react";

const stories = [
  {
    type: "english",
    name: "Dr. Arslan Khan",
    title: "Surgical Consultant, UAE",
    content: "Hamza transformed my medical presentations. I went from struggling with professional tone to delivering keynote speeches in English with absolute confidence.",
    result: "Band 8.5 IELTS",
    icon: <GraduationCap className="text-indigo-500" />
  },
  {
    type: "software",
    name: "Sarah Jenkins",
    title: "Founder, BloomSaaS",
    content: "Litgenics built our entire MVP in 3 weeks. The clean code and SEO architecture helped us secure our first 1,000 users within a month of launch.",
    result: "10x Growth",
    icon: <Briefcase className="text-indigo-500" />
  },
  {
    type: "english",
    name: "Ahmed Al-Farsi",
    title: "Executive Director, Qatar",
    content: "The Business English coaching is world-class. It’s not just language; it’s about understanding the high-stakes cultural nuances of global negotiation.",
    result: "Executive Level",
    icon: <User className="text-indigo-500" />
  }
];

const SuccessStories = () => {
  return (
    <section id="stories" className="py-32 px-4 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4"
          >
            Proof of Impact
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase"
          >
            SUCCESS <span className="text-gradient">STORIES</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-[3rem] p-10 flex flex-col relative group hover:bg-white dark:hover:bg-slate-900 transition-all duration-500"
            >
              <Quote className="absolute top-10 right-10 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#6366f1" className="text-indigo-500" />)}
              </div>

              <p className="text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-10 flex-1">
                &quot;{story.content}&quot;
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {story.icon}
                </div>
                <div>
                  <h4 className="font-black tracking-tight uppercase text-slate-900 dark:text-white">{story.name}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{story.title}</p>
                </div>
                <div className="ml-auto bg-indigo-600 text-white px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-tighter">
                  {story.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
