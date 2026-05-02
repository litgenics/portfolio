"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, DollarSign, Clock, Users, ArrowRight } from "lucide-react";

const SaasRoiCalculator = () => {
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);

  const monthlyCost = employees * hoursPerWeek * 4 * hourlyRate;
  const yearlyCost = monthlyCost * 12;
  const potentialSavings = yearlyCost * 0.7; // Assuming 70% efficiency gain with automation

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Inputs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] p-10 md:p-14"
        >
          <h3 className="text-2xl font-black mb-10 flex items-center gap-3 uppercase tracking-tight">
            <Calculator className="text-indigo-600" size={32} /> ROI Parameters
          </h3>

          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Users size={16} /> Team Members
                </label>
                <span className="text-2xl font-black text-indigo-600">{employees}</span>
              </div>
              <input 
                type="range" min="1" max="100" value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="mt-2 text-xs text-slate-400 font-medium italic">Number of people performing manual tasks.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Clock size={16} /> Hours/Week (Per Person)
                </label>
                <span className="text-2xl font-black text-indigo-600">{hoursPerWeek}h</span>
              </div>
              <input 
                type="range" min="1" max="40" value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="mt-2 text-xs text-slate-400 font-medium italic">Time lost to manual data entry, reporting, or admin.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <DollarSign size={16} /> Avg. Hourly Rate
                </label>
                <span className="text-2xl font-black text-indigo-600">${hourlyRate}</span>
              </div>
              <input 
                type="range" min="15" max="250" value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="mt-2 text-xs text-slate-400 font-medium italic">Internal cost (salary + overhead) per hour.</p>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="glass rounded-[3rem] p-10 md:p-14 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingDown size={180} />
            </div>
            
            <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 relative z-10">Annual Efficiency Leak</p>
            <h4 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 relative z-10">
              ${yearlyCost.toLocaleString()}
            </h4>
            <p className="text-slate-400 font-medium text-lg relative z-10">
              This is the current annual cost of manual processes for your team.
            </p>

            <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-4">Potential Annual Savings</p>
              <h4 className="text-5xl font-black tracking-tighter text-emerald-500">
                ${Math.round(potentialSavings).toLocaleString()}*
              </h4>
              <p className="mt-4 text-sm text-slate-500 font-medium italic">
                *Estimated based on a 70% reduction in manual labor through custom automation solutions.
              </p>
            </div>
          </div>

          <div className="glass rounded-[3rem] p-10 text-center border-2 border-indigo-600/20">
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Stop the <span className="text-gradient">Leak</span></h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
              We build custom internal tools that pay for themselves in months, not years. 
            </p>
            <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30">
              Book Automation Discovery <ArrowRight />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SaasRoiCalculator;
