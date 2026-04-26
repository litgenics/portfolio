"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, ArrowRight, CheckCircle2 } from "lucide-react";

const IELTSPredictor = () => {
  const [scores, setScores] = useState({
    listening: 6.0,
    reading: 6.0,
    writing: 6.0,
    speaking: 6.0,
  });
  const [overall, setOverall] = useState(6.0);

  const calculateScore = (vals: typeof scores) => {
    const avg = (vals.listening + vals.reading + vals.writing + vals.speaking) / 4;
    // IELTS Rounding Logic:
    // .25 rounds up to .5
    // .75 rounds up to next whole number
    const fraction = avg % 1;
    let rounded = Math.floor(avg);
    if (fraction >= 0.75) rounded += 1.0;
    else if (fraction >= 0.25) rounded += 0.5;
    
    return rounded;
  };

  useEffect(() => {
    setOverall(calculateScore(scores));
  }, [scores]);

  const handleSliderChange = (section: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [section]: value }));
  };

  const sections = [
    { id: 'listening', label: 'Listening', color: 'bg-blue-500' },
    { id: 'reading', label: 'Reading', color: 'bg-emerald-500' },
    { id: 'writing', label: 'Writing', color: 'bg-amber-500' },
    { id: 'speaking', label: 'Speaking', color: 'bg-rose-500' },
  ];

  return (
    <section id="tools" className="py-32 px-4 bg-slate-50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                IELTS BAND <br />
                <span className="text-gradient">PREDICTOR</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-lg">
                Curious about your potential score? Use our official logic calculator to estimate 
                your Band Score and see where you need to improve.
              </p>
              
              <div className="space-y-4 mb-12">
                {[
                  "Official Rounding Algorithm",
                  "Instant Result Calculation",
                  "Personalized Coaching Advice",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="text-indigo-500" size={20} />
                    {item}
                  </div>
                ))}
              </div>

              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-black hover:border-indigo-500 transition-all shadow-xl shadow-indigo-500/5"
              >
                Book a Mock Test
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Estimate Your Band</h3>
            </div>

            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-black uppercase tracking-widest text-slate-500">{s.label}</label>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{scores[s.id as keyof typeof scores].toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="9" 
                    step="0.5" 
                    value={scores[s.id as keyof typeof scores]}
                    onChange={(e) => handleSliderChange(s.id as keyof typeof scores, parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-indigo-600 rounded-[2rem] text-white text-center shadow-2xl shadow-indigo-500/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-colors" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-2 opacity-80">Predicted Overall Band</p>
              <motion.p 
                key={overall}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl font-black tracking-tighter"
              >
                {overall.toFixed(1)}
              </motion.p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest opacity-60 flex items-center justify-center gap-2">
                <Info size={14} /> Based on official IELTS rounding
              </p>
            </div>

            {/* Sales Bridge: Next Step */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-center"
            >
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                {overall < 7.5 
                  ? `You are ${(7.5 - overall).toFixed(1)} points away from a top-tier score.` 
                  : "Excellent potential! Now let's secure your admission."}
              </p>
              <a 
                href={overall < 7.5 ? "https://wa.me/923120295549?text=I%20got%20a%20predicted%20score%20of%20" + overall.toFixed(1) + "%20and%20need%20an%20Intensive%20Gap%20Analysis." : "https://wa.me/923120295549?text=I%20got%20a%20" + overall.toFixed(1) + "%20score!%20I%20need%20a%20University%20Strategy%20session."}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all"
              >
                {overall < 7.5 ? "Book Intensive Gap Analysis" : "Get Strategy Session"}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IELTSPredictor;
