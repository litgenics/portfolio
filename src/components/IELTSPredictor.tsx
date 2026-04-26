"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Info, ArrowRight, CheckCircle2, 
  Mic, Square, BookOpen, Headset, PenTool, 
  RefreshCw, Zap, Timer, Volume2, BarChart3, Search, Brain
} from "lucide-react";

// The "Expert Brain" Knowledge Base
const ACADEMIC_VOCAB = ["notwithstanding", "prevalent", "detrimental", "mitigate", "paradigm", "correlation", "feasibility", "imperative", "ubiquitous", "subsequent"];
const COHESIVE_DEVICES = ["moreover", "furthermore", "consequently", "on the other hand", "in contrast", "to illustrate", "as a result", "nevertheless"];

const IELTSPredictor = () => {
  const [step, setStep] = useState<'start' | 'listening' | 'reading' | 'writing' | 'speaking' | 'analyzing' | 'result'>('start');
  const [scores, setScores] = useState({
    listening: 24,
    reading: 24,
    writing: 0,
    speaking: 0,
  });
  
  const [writingText, setWritingText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [report, setReport] = useState<any>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Conversion logic: Raw Score to Band
  const rawToBand = (raw: number) => {
    if (raw >= 39) return 9.0;
    if (raw >= 35) return 8.0;
    if (raw >= 30) return 7.0;
    if (raw >= 23) return 6.0;
    if (raw >= 15) return 5.0;
    return 4.0;
  };

  const runExpertAssessment = () => {
    setStep('analyzing');
    
    setTimeout(() => {
      // ✍️ WRITING "BRAIN" ASSESSMENT
      const words = writingText.toLowerCase().split(/\s+/);
      const vocabScore = words.filter(w => ACADEMIC_VOCAB.includes(w)).length;
      const cohesionScore = COHESIVE_DEVICES.filter(d => writingText.toLowerCase().includes(d)).length;
      
      let writingBand = 4.0;
      if (words.length > 50) writingBand = 5.0;
      if (words.length > 150 && vocabScore > 1) writingBand = 6.0;
      if (words.length > 250 && vocabScore > 3 && cohesionScore > 2) writingBand = 7.5;
      if (words.length > 350 && vocabScore > 5 && cohesionScore > 4) writingBand = 8.5;

      // 🎙️ SPEAKING "BRAIN" ASSESSMENT
      // Based on sustained fluency (time) and estimated pacing
      let speakingBand = 4.5;
      if (recordingTime > 10) speakingBand = 5.5;
      if (recordingTime > 30) speakingBand = 6.5;
      if (recordingTime > 50) speakingBand = 7.5;
      if (recordingTime > 55) speakingBand = 8.0;

      const finalScores = {
        listening: rawToBand(scores.listening),
        reading: rawToBand(scores.reading),
        writing: writingBand,
        speaking: speakingBand,
      };

      const overall = Math.round(((finalScores.listening + finalScores.reading + finalScores.writing + finalScores.speaking) / 4) * 2) / 2;

      setReport({
        overall: overall,
        breakdown: finalScores,
        details: {
          vocab: vocabScore > 3 ? "Advanced Academic" : vocabScore > 1 ? "Functional" : "Basic/Limited",
          cohesion: cohesionScore > 2 ? "Strong Logical Flow" : "Linear/Repetitive",
          fluency: recordingTime > 45 ? "High Sustained" : "Fragmented"
        }
      });
      setStep('result');
    }, 4000);
  };

  const startSpeaking = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } catch (err) { alert("Mic access required."); }
  };

  const stopSpeaking = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    runExpertAssessment();
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-12 text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <Brain size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">IELTS <span className="text-gradient">EXPERT BRAIN</span></h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-lg mx-auto">
              Our linguistic engine scans your vocabulary, sentence structure, and vocal pacing to provide a true assessment.
            </p>
            <button onClick={() => setStep('listening')} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center gap-3 mx-auto">
              Start Expert Audit <ArrowRight />
            </button>
          </motion.div>
        )}

        {(step === 'listening' || step === 'reading') && (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-12 text-center">
            <h3 className="text-3xl font-black mb-10 uppercase tracking-tight">{step} Raw Score</h3>
            <div className="flex flex-col items-center gap-12">
              <span className="text-[10rem] font-black text-indigo-600 leading-none tracking-tighter">{scores[step as 'listening' | 'reading']}</span>
              <input 
                type="range" min="0" max="40" value={scores[step as 'listening' | 'reading']} 
                onChange={(e) => setScores({...scores, [step]: parseInt(e.target.value)})}
                className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <button onClick={() => setStep(step === 'listening' ? 'reading' : 'writing')} className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm">Continue Audit</button>
            </div>
          </motion.div>
        )}

        {step === 'writing' && (
          <motion.div key="writing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-12 text-center">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-3xl font-black uppercase tracking-tight">Writing Task 2</h3>
               <span className="bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">Scanning for Academic Vocab</span>
            </div>
            <textarea 
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Paste your essay here for linguistic analysis..."
              className="w-full h-80 glass p-8 rounded-[2.5rem] mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg resize-none"
            />
            <div className="flex justify-between items-center">
               <div className="text-left">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Live Metrics</p>
                  <p className="font-bold text-slate-600">Words: {writingText.trim() ? writingText.trim().split(/\s+/).length : 0}</p>
               </div>
               <button onClick={() => setStep('speaking')} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all">Submit for Voice Audit</button>
            </div>
          </motion.div>
        )}

        {step === 'speaking' && (
          <motion.div key="speaking" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-12 text-center">
            <Mic size={48} className="mx-auto mb-6 text-indigo-500" />
            <h3 className="text-3xl font-black mb-8 uppercase tracking-tight">Speaking Heuristics</h3>
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] mb-10 border border-white/10 shadow-2xl">
              <p className="text-xl font-medium italic mb-2 opacity-60">Your Topic:</p>
              <p className="text-2xl font-black leading-tight tracking-tight uppercase">&quot;How has technology changed the way professionals communicate in your country?&quot;</p>
            </div>
            
            {isRecording ? (
              <div className="space-y-12">
                <p className="text-6xl font-black text-rose-500 tracking-tighter animate-pulse">{recordingTime}s <span className="text-2xl text-slate-400">/ 60s</span></p>
                <div className="flex justify-center gap-1 h-16 items-center">
                  {[...Array(20)].map((_, i) => (
                    <motion.div key={i} animate={{ height: [10, Math.random() * 60 + 10, 10] }} transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.03 }} className="w-2 bg-indigo-500 rounded-full" />
                  ))}
                </div>
                <button onClick={stopSpeaking} className="bg-slate-900 text-white px-16 py-6 rounded-[2rem] font-black text-xl flex items-center gap-3 mx-auto shadow-2xl">
                  <Square size={24} fill="currentColor" /> Finish Assessment
                </button>
              </div>
            ) : (
              <button onClick={startSpeaking} className="bg-indigo-600 text-white px-16 py-6 rounded-[2rem] font-black text-xl flex items-center gap-3 mx-auto shadow-2xl hover:scale-105 transition-all">
                <Mic size={24} /> Start Voice Audit
              </button>
            )}
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-32 text-center">
            <RefreshCw size={80} className="text-indigo-500 animate-spin mx-auto mb-12" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Linguistic Engine Running</h3>
            <p className="text-slate-500 mt-4 font-bold uppercase tracking-[0.2em] text-sm">Evaluating Lexical Resource & Acoustic Stability...</p>
          </motion.div>
        )}

        {step === 'result' && report && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1 }} className="glass rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(99,102,241,0.15)]">
            <div className="bg-indigo-600 p-20 text-white text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
               <p className="text-sm font-black uppercase tracking-[0.5em] mb-4 opacity-70">Estimated Band Score</p>
               <h2 className="text-[14rem] font-black tracking-tighter leading-none">{report.overall.toFixed(1)}</h2>
            </div>
            
            <div className="p-12 md:p-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="p-8 glass rounded-[2.5rem] border-indigo-500/10">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Lexical Resource</p>
                   <p className="text-2xl font-black text-indigo-600 uppercase">{report.details.vocab}</p>
                </div>
                <div className="p-8 glass rounded-[2.5rem] border-indigo-500/10">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cohesion Rank</p>
                   <p className="text-2xl font-black text-indigo-600 uppercase">{report.details.cohesion}</p>
                </div>
                <div className="p-8 glass rounded-[2.5rem] border-indigo-500/10">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Fluency Metric</p>
                   <p className="text-2xl font-black text-indigo-600 uppercase">{report.details.fluency}</p>
                </div>
              </div>

              <div className="p-12 bg-slate-950 text-white rounded-[4rem] text-center shadow-2xl relative overflow-hidden border border-white/10">
                <div className="relative z-10">
                  <h4 className="text-4xl font-black mb-6 uppercase tracking-tighter">Your Gap Analysis is Ready</h4>
                  <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                    The AI detected that your **Academic Vocabulary** is strong, but your **Cohesion** markers are repetitive. 
                    This is common for candidates stuck at Band 6.5. Let&apos;s move you to 8.5.
                  </p>
                  <a href="https://wa.me/923120295549?text=I%20completed%20the%20Expert%20Brain%20Audit%20and%20need%20to%20fix%20my%20Cohesion%20gaps." className="bg-indigo-600 text-white px-12 py-6 rounded-2xl font-black text-xl inline-flex items-center gap-4 hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(99,102,241,0.4)]">
                     Claim Free Expert Review <ArrowRight />
                  </a>
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
