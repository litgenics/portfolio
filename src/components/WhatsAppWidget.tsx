"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification after 5 seconds to catch attention
    const timer = setTimeout(() => setShowNotification(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "923120295549"; // Your verified WhatsApp number
  const message = encodeURIComponent("Hi Hamza! I'm interested in your English Coaching / Software services. Can we talk?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-4 mb-4 border border-slate-100 dark:border-slate-800 max-w-[240px] relative"
          >
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute -top-2 -right-2 bg-slate-200 dark:bg-slate-800 rounded-full p-1 hover:scale-110 transition-transform"
            >
              <X size={12} />
            </button>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-500 flex-shrink-0 border-2 border-indigo-500/20">
                 <img src="/portfolio/images/profile.jfif" alt="Hamza" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">M. Hamza Shaikh</p>
                <p className="text-[10px] font-bold text-slate-500 leading-tight">Online now. How can I help you today?</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors relative group"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 group-hover:hidden" />
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[320px] glass rounded-[2.5rem] overflow-hidden shadow-2xl border-white/20"
          >
            <div className="bg-emerald-500 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">
                  <img src="/portfolio/images/profile.jfif" alt="Hamza" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black tracking-tight uppercase">M. Hamza Shaikh</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Founder of litgenics</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Hello! 👋 <br/>
                  I&apos;m here to help you with English coaching or custom software solutions. What&apos;s on your mind?
                </p>
              </div>
              
              <a 
                href={whatsappUrl}
                target="_blank"
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Start WhatsApp Chat
                <Send size={16} />
              </a>
              
              <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
                <Sparkles size={10} className="inline mr-1" /> Typically replies in under 1 hour
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppWidget;
