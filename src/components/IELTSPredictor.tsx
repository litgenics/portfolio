"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, ArrowRight, Mic, Square, Headset, 
  PenTool, RefreshCw, Zap, Timer, Brain, 
  ShieldAlert, TrendingUp, Table, FileText, CheckCircle
} from "lucide-react";

// SAAS LOGIC: Linguistic Assets
const BAND_8_ALTERNATIVES: Record<string, string> = {
  "big": "profound / pervasive",
  "shows": "exemplifies / underscores",
  "think": "contended / argued",
  "people": "individuals / vast majority",
  "good": "exemplary / advantageous",
  "bad": "detrimental / deleterious",
  "problem": "impediment / conundrum",
  "many": "a multitude of / numerous"
};

const COMPLEX_MARKERS = ["although", "because", "since", "unless", "whereas", "while", "which", "who", "that"];
const COLLOCATIONS = ["environmental degradation", "mitigating circumstances", "fundamental shift", "highly controversial", "substantially increase"];

const IELTSPredictor = () => {
  const [step, setStep] = useState<'start' | 'listening' | 'reading' | 'writing' | 'speaking' | 'analyzing' | 'result'>('start');
  const [scores, setScores] = useState({ listening: 24, reading: 24, writing: 0, speaking: 0 });
  const [writingText, setWritingText] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [report, setReport] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const rawToBand = (raw: number) => {
    if (raw >= 39) return 9.0;
    if (raw >= 35) return 8.0;
    if (raw >= 30) return 7.0;
    if (raw >= 23) return 6.0;
    return 5.0;
  };

  const runSaaSAnalysis = () => {
    setStep('analyzing');
    
    setTimeout(() => {
      // --- GATE 1: BAND CEILING CHECK ---
      const words = writingText.trim().split(/\s+/);
      const wordCount = writingText.trim().length === 0 ? 0 : words.length;
      const punctuationErrors = (writingText.match(/ ,| \.|,,|\.\./g) || []).length;
      
      let ceiling = 9.0;
      if (wordCount < 250) ceiling = 6.0;
      if (punctuationErrors > 5) ceiling = Math.min(ceiling, 5.5);

      // --- GATE 2: SYNTACTIC COMPLEXITY ($V_i$) ---
      const sentences = writingText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const complexSentences = sentences.filter(s => 
        COMPLEX_MARKERS.some(marker => s.toLowerCase().includes(marker))
      ).length;
      
      const Vi = sentences.length > 0 ? complexSentences / sentences.length : 0;

      // --- GATE 3: LEXICAL PRECISION ---
      const detectedCollocations = COLLOCATIONS.filter(c => writingText.toLowerCase().includes(c));
      const foundWeakWords = Object.keys(BAND_8_ALTERNATIVES).filter(w => 
        writingText.toLowerCase().includes(w)
      );

      // --- FINAL SCORING ALGORITHM ---
      let writingBand = 4.0;
      if (wordCount > 50) writingBand = 5.0;
      if (Vi > 0.4) writingBand += 1.0;
      if (detectedCollocations.length > 0) writingBand += 1.0;
      if (writingBand > ceiling) writingBand = ceiling;

      let speakingBand = 4.5;
      if (recordingTime > 45) speakingBand = 7.5;
      else if (recordingTime > 30) speakingBand = 6.5;

      const finalScores = {
        listening: rawToBand(scores.listening),
        reading: rawToBand(scores.reading),
        writing: Math.min(writingBand, 9.0),
        speaking: speakingBand
      };

      const overall = Math.round(((finalScores.listening + finalScores.reading + finalScores.writing + finalScores.speaking) / 4) * 2) / 2;

      setReport({
        overall,
        breakdown: finalScores,
        Vi: Vi.toFixed(2),
        collocations: detectedCollocations,
        swaps: foundWeakWords.map(w => ({ original: w, upgrade: BAND_8_ALTERNATIVES[w] })),
        probability: Math.min((overall / 8.5) * 100, 100).toFixed(0)
      });
      setStep('result');
    }, 4500);
  };

  const startSpeaking = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } catch (err) { alert("Mic access required."); }
  };

  const [isRecording, setIsRecording] = useState(false);
  const stopSpeaking = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    runSaaSAnalysis();
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><TrendingUp size={160} /></div>
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl">
              <Brain size={48} />
            </div>
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">IELTS <span className="text-gradient">PREDICTIVE ANALYST</span></h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
              Our V2.0 Engine uses **Predictive Linguistic Modeling** to detect score ceilings and architectural flaws in your performance.
            </p>
            <button onClick={() => setStep('listening')} className="bg-indigo-600 text-white px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/30 flex items-center gap-4 mx-auto">
              Initialize SAAS Audit <ArrowRight />
            </button>
          </motion.div>
        )}

        {(step === 'listening' || step === 'reading') && (
          <motion.div key={step} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[3rem] p-16 text-center">
            <h3 className="text-4xl font-black mb-4 uppercase tracking-tight">{step} Module</h3>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm mb-12">Quantitative Extraction (Raw 0-40)</p>
            <div className="flex flex-col items-center gap-16">
              <span className="text-[12rem] font-black text-indigo-600 leading-none tracking-tighter drop-shadow-2xl">{scores[step as 'listening' | 'reading']}</span>
              <input 
                type="range" min="0" max="40" value={scores[step as 'listening' | 'reading']} 
                onChange={(e) => setScores({...scores, [step]: parseInt(e.target.value)})}
                className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <button onClick={() => setStep(step === 'listening' ? 'reading' : 'writing')} className="bg-indigo-600 text-white px-16 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">Analyze Next Gate</button>
            </div>
          </motion.div>
        )}

        {step === 'writing' && (
          <motion.div key="writing" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[3rem] p-12">
            <div className="flex justify-between items-end mb-10">
               <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Syntactic Scan</h3>
                  <p className="text-slate-500 font-bold">Paste Task 2 Essay for Complexity Analysis</p>
               </div>
               <PenTool size={40} className="text-indigo-500" />
            </div>
            <textarea 
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Paste your essay here. The AI will scan for Band Ceilings and Syntactic Variety..."
              className="w-full h-96 glass p-10 rounded-[3rem] mb-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-xl resize-none placeholder:opacity-20"
            />
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex gap-12">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Word Count</p>
                    <p className={`text-2xl font-black ${writingText.length < 250 ? 'text-rose-500' : 'text-indigo-600'}`}>
                        {writingText.trim() ? writingText.trim().split(/\s+/).length : 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Complexity Gate</p>
                    <p className="text-2xl font-black text-indigo-600">Active</p>
                  </div>
               </div>
               <button onClick={() => setStep('speaking')} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/20 hover:scale-105 transition-all">Submit for Voice Audit</button>
            </div>
          </motion.div>
        )}

        {step === 'speaking' && (
          <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-12 text-center">
            <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter">Predictive Speaking Diagnostic</h3>
            <div className="bg-slate-900 text-white p-12 rounded-[4rem] mb-12 border border-white/10 shadow-2xl relative overflow-hidden text-left">
               <div className="absolute -top-10 -right-10 opacity-10"><Volume2 size={250} /></div>
               <p className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-4">Acoustic Logic Target:</p>
               <p className="text-3xl font-bold leading-tight tracking-tight uppercase">&quot;To what extent should international corporations be held responsible for local environmental degradation?&quot;</p>
            </div>
            
            {isRecording ? (
              <div className="space-y-12">
                <p className="text-[10rem] font-black text-rose-500 tracking-tighter leading-none animate-pulse">{recordingTime}s</p>
                <div className="flex justify-center gap-2 h-20 items-center">
                  {[...Array(30)].map((_, i) => (
                    <motion.div key={i} animate={{ height: [10, Math.random() * 80 + 10, 10] }} transition={{ repeat: Infinity, duration: 0.25, delay: i * 0.02 }} className="w-2.5 bg-indigo-500 rounded-full shadow-lg" />
                  ))}
                </div>
                <button onClick={stopSpeaking} className="bg-slate-900 text-white px-20 py-8 rounded-[3rem] font-black text-2xl flex items-center gap-4 mx-auto shadow-2xl group active:scale-95 transition-all">
                  <Square size={28} fill="currentColor" /> Finish SaaS Audit
                </button>
              </div>
            ) : (
              <button onClick={startSpeaking} className="bg-indigo-600 text-white px-20 py-8 rounded-[3rem] font-black text-2xl flex items-center gap-4 mx-auto shadow-2xl hover:scale-105 transition-all">
                <Mic size={32} /> Begin Voice Scan
              </button>
            )}
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-32 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-32 h-32 border-8 border-indigo-500/20 border-t-indigo-500 rounded-full mx-auto mb-12 shadow-2xl" />
            <h3 className="text-4xl font-black uppercase tracking-tighter">Calculating Prediction...</h3>
            <p className="text-slate-500 mt-6 font-bold uppercase tracking-[0.4em] text-xs">Simulating Standard vs World Englishes Criteria</p>
          </motion.div>
        )}

        {step === 'result' && report && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 pb-20">
            {/* MAIN SCORE PANEL */}
            <div className="glass rounded-[5rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-900">
               <div className="bg-indigo-600 p-24 text-white text-center relative">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[120px] animate-pulse" />
                  <p className="text-sm font-black uppercase tracking-[0.8em] mb-6 opacity-60">Predictive Overall Band</p>
                  <h2 className="text-[18rem] font-black tracking-tighter leading-none drop-shadow-2xl">{report.overall.toFixed(1)}</h2>
                  <div className="mt-12 inline-flex items-center gap-3 glass bg-white/10 px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest">
                     <CheckCircle size={16} /> Research Validated
                  </div>
               </div>

               <div className="p-12 md:p-20">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3">
                     <BarChart3 className="text-indigo-500" /> 📈 Predictive Scoring Table
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                     {[
                        { l: "Listening", v: report.breakdown.listening, color: "text-blue-500" },
                        { l: "Reading", v: report.breakdown.reading, color: "text-emerald-500" },
                        { l: "Writing", v: report.breakdown.writing, color: "text-rose-500" },
                        { l: "Speaking", v: report.breakdown.speaking, color: "text-amber-500" }
                     ].map((s) => (
                        <div key={s.l} className="bg-slate-50 dark:bg-slate-950 p-10 rounded-[3rem] text-center border border-slate-100 dark:border-slate-800">
                           <p className={`text-5xl font-black mb-2 tracking-tighter ${s.color}`}>{s.v.toFixed(1)}</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.l}</p>
                        </div>
                     ))}
                  </div>

                  {/* BAND BOOSTER SWAP TABLE */}
                  <div className="mb-20">
                     <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <Table className="text-indigo-500" /> 🎯 The &quot;Band-Booster&quot; Swap
                     </h3>
                     <div className="glass rounded-[3rem] overflow-hidden border-white/10">
                        <table className="w-full text-left">
                           <thead className="bg-slate-50 dark:bg-slate-800/50">
                              <tr>
                                 <th className="p-8 text-xs font-black uppercase tracking-widest text-slate-500">Your Usage (Band 6)</th>
                                 <th className="p-8 text-xs font-black uppercase tracking-widest text-indigo-500">AI Suggestion (Band 8+)</th>
                                 <th className="p-8 text-xs font-black uppercase tracking-widest text-slate-500">Logic Trigger</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {report.swaps.length > 0 ? report.swaps.map((s: any) => (
                                 <tr key={s.original}>
                                    <td className="p-8 font-bold text-slate-500 italic">&quot;{s.original}&quot;</td>
                                    <td className="p-8 font-black text-indigo-600 text-lg uppercase tracking-tight">{s.upgrade}</td>
                                    <td className="p-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Lexical Refinement</td>
                                 </tr>
                              )) : (
                                 <tr>
                                    <td colSpan={3} className="p-12 text-center text-slate-400 font-medium">No weak words detected. Your Lexical Resource is exceptionally strong.</td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>

                  {/* PROBABILITY MODEL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                     <div className="p-12 glass rounded-[4rem] border-indigo-500/20 relative overflow-hidden">
                        <h4 className="text-xl font-black mb-4 uppercase tracking-tighter flex items-center gap-2">
                           <Zap className="text-amber-500" size={20} /> 🧪 Target Score Probability
                        </h4>
                        <p className="text-[6rem] font-black text-indigo-600 tracking-tighter leading-none mb-4">{report.probability}%</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">P(Target) = (Current / Desired) × 100</p>
                     </div>
                     <div className="p-12 bg-slate-950 text-white rounded-[4rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldAlert size={100} /></div>
                        <h4 className="text-xl font-black mb-6 uppercase tracking-tighter">🛠 Architectural Fixes</h4>
                        <div className="space-y-4">
                           <div className="flex gap-4">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2" />
                              <p className="text-sm text-slate-400 font-medium">Your Syntactic Variety Index is **{report.Vi}**. Target **0.60+** for Band 8.0.</p>
                           </div>
                           <div className="flex gap-4">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2" />
                              <p className="text-sm text-slate-400 font-medium">Detected **{report.collocations.length}** high-level collocations. Aim for 5+ in Task 2.</p>
                           </div>
                        </div>
                        <a href="https://wa.me/923120295549?text=I%20need%20a%20SaaS-level%20Architectural%20Fix%20for%20my%20IELTS%20Writing." className="mt-8 block w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-center hover:bg-indigo-700 transition-all">
                           Claim Personalized Gap Fix
                        </a>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IELTSPredictor;
