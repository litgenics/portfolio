"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, GraduationCap, Globe, ExternalLink, Filter, MapPin, Award, BookCheck } from "lucide-react";

const uniData = [
  { name: "Oxford University", country: "UK", ielts: "7.5", sat: "1470+", majors: ["Law", "Medicine", "Philosophy"], link: "https://www.ox.ac.uk/" },
  { name: "Harvard University", country: "USA", ielts: "7.5", sat: "1500+", majors: ["Business", "Politics", "Sciences"], link: "https://www.harvard.edu/" },
  { name: "University of Toronto", country: "Canada", ielts: "7.0", sat: "1350+", majors: ["Engineering", "Computer Science"], link: "https://www.utoronto.ca/" },
  { name: "University of Melbourne", country: "Australia", ielts: "7.0", sat: "1300+", majors: ["Business", "Arts", "Health"], link: "https://www.unimelb.edu.au/" },
  { name: "MIT", country: "USA", ielts: "7.5", sat: "1520+", majors: ["Tech", "Physics", "Math"], link: "https://www.mit.edu/" },
  { name: "National University of Singapore", country: "Singapore", ielts: "7.0", sat: "1450+", majors: ["Economics", "Engineering"], link: "https://nus.edu.sg/" },
  { name: "University of British Columbia", country: "Canada", ielts: "6.5", sat: "1300+", majors: ["Global Studies", "Management"], link: "https://www.ubc.ca/" },
  { name: "Imperial College London", country: "UK", ielts: "7.0", sat: "1400+", majors: ["STEM", "Business"], link: "https://www.imperial.ac.uk/" }
];

const UniversityFinder = () => {
  const [filter, setFilter] = useState({ country: "All", major: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const findUniversities = () => {
    setIsSearching(true);
    setTimeout(() => {
      const filtered = uniData.filter(u => {
        const matchCountry = filter.country === "All" || u.country === filter.country;
        const matchMajor = !filter.major || u.majors.some(m => m.toLowerCase().includes(filter.major.toLowerCase()));
        return matchCountry && matchMajor;
      });
      setResults(filtered);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[3.5rem] p-8 md:p-16 text-center mb-16"
      >
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
          <GraduationCap size={40} />
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Global <br/> <span className="text-gradient">Uni Finder</span></h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-12 max-w-2xl mx-auto">
          Input your target destination and desired major. We'll match you with 
          top-tier institutions based on IELTS and SAT requirements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="space-y-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Destination</label>
            <select 
              value={filter.country}
              onChange={(e) => setFilter({...filter, country: e.target.value})}
              className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold appearance-none cursor-pointer"
            >
              <option value="All">All Countries</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          
          <div className="space-y-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Major / Field</label>
            <input 
              type="text" 
              placeholder="e.g. Engineering, Law..."
              value={filter.major}
              onChange={(e) => setFilter({...filter, major: e.target.value})}
              className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button 
              onClick={findUniversities}
              disabled={isSearching}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center justify-center gap-3 disabled:opacity-50 h-[60px]"
            >
              {isSearching ? <RefreshCw className="animate-spin" /> : <Search size={20} />}
              Find Matches
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {results.length > 0 && !isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((uni, i) => (
                <motion.div
                  key={uni.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-[2.5rem] p-10 group hover:border-indigo-500/50 transition-all border-white/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-indigo-500 shadow-xl group-hover:scale-110 transition-transform">
                      <Globe size={28} />
                    </div>
                    <span className="px-4 py-2 glass rounded-full text-xs font-black text-indigo-500 uppercase tracking-widest">
                      {uni.country}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black mb-6 tracking-tight uppercase leading-tight">{uni.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">IELTS Goal</p>
                      <p className="text-lg font-black text-indigo-600">{uni.ielts}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SAT Goal</p>
                      <p className="text-lg font-black text-purple-600">{uni.sat}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {uni.majors.map((m: string) => (
                      <span key={m} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                        {m}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={uni.link} 
                    target="_blank"
                    className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                  >
                    Official Admissions <ExternalLink size={14} />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Tool-to-Sale Pipeline: Admission Pack */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 glass rounded-[3rem] border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-900/10 text-center"
            >
              <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter">Ready to Apply?</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 max-w-xl mx-auto">
                Don&apos;t risk rejection. Get our **Elite Admission Pack** which includes an 
                IELTS high-score strategy and a professional review of your Personal Statement.
              </p>
              <a 
                href="https://wa.me/923120295549?text=I%20found%20my%20target%20university%20and%20want%20to%20get%20the%20Elite%20Admission%20Pack."
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
              >
                Secure My Admission <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { RefreshCw } from "lucide-react";
export default UniversityFinder;
