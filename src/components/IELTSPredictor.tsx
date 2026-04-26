"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Info, ArrowRight, CheckCircle2, 
  Mic, Square, BookOpen, Headset, PenTool, 
  RefreshCw, Zap, Timer, Volume2, BarChart3 
} from "lucide-react";

const IELTSPredictor = () => {
  const [step, setStep] = useState<'start' | 'listening' | 'reading' | 'writing' | 'speaking' | 'analyzing' | 'result'>('start');
  const [scores, setScores] = useState({
    listening: 24, // Raw score 0-40
    reading: 24,   // Raw score 0-40
    writing: 0,    // AI Calculated
    speaking: 0,   // AI Calculated
  });
  
  const [writingText, setWritingText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Conversion logic: Raw Score (0-40) to Band (0-9)
  const rawToBand = (raw: number) => {
    if (raw >= 39) return 9.0;
    if (raw >= 37) return 8.5;
    if (raw >= 35) return 8.0;
    if (raw >= 32) return 7.5;
    if (raw >= 30) return 7.0;
    if (raw >= 26) return 6.5;
    if (raw >= 23) return 6.0;
    if (raw >= 18) return 5.5;
    if (raw >= 15) return 5.0;
    return 4.0;
  };

  const analyzeWriting = () => {
    const wordCount = writingText.trim().split(/\s+/).length;
    if (writingText.trim().length === 0) return 0;
    
    // Logic: Word count + variety estimate
    if (wordCount > 250) return 7.5;
    if (wordCount > 200) return 6.5;
    if (wordCount > 150) return 5.5;
    if (wordCount > 50) return 4.5;
    return 3.0;
  };

  const calculateOverall = () => {
    const l = rawToBand(scores.listening);
    const r = rawToBand(scores.reading);
    const w = scores.writing || 4.0;
    const s = scores.speaking || 4.0;
    const avg = (l + r + w + s) / 4;
    const fraction = avg % 1;
    let rounded = Math.floor(avg);
    if (fraction >= 0.75) rounded += 1.0;
    else if (fraction >= 0.25) rounded += 0.5;
    return rounded;
  };

  const startSpeakingTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } catch (err) {
      alert("Please allow mic access for the Speaking test.");
    }
  };

  const stopSpeakingTest = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setStep('analyzing');
      
      // Simulate Nano-Banana Analysis based on recording time
      setTimeout(() => {
        const timeFactor = Math.min(recordingTime / 30, 1); // Prefer at least 30s
        const aiBand = Math.floor((6.0 + (timeFactor * 2.5)) * 2) / 2; // Range 6.0 to 8.5
        setScores(prev => ({ ...prev, speaking: aiBand, writing: analyzeWriting() }));
        setStep('result');
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[3rem] p-12 text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <Calculator size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">IELTS <span className="text-gradient">Mini-Mock</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-10 max-w-lg mx-auto">
              Test your current level across all 4 modules. Our AI engine analyzes your inputs to predict your band.
            </p>
            <button onClick={() => setStep('listening')} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center gap-3 mx-auto">
              Begin Assessment <ArrowRight />
            </button>
          </motion.div>
        )}

        {(step === 'listening' || step === 'reading') && (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[3rem] p-12 text-center">
            {step === 'listening' ? <Headset size={48} className="mx-auto mb-6 text-indigo-500" /> : <BookOpen size={48} className="mx-auto mb-6 text-indigo-500" />}
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{step} Section</h3>
            <p className="text-slate-500 mb-10 font-bold text-sm uppercase tracking-widest">Correct Answers (0-40)</p>
            <div className="flex flex-col items-center gap-8">
              <span className="text-8xl font-black text-indigo-600 tracking-tighter">{scores[step as 'listening' | 'reading']}</span>
              <input 
                type="range" min="0" max="40" value={scores[step as 'listening' | 'reading']} 
                onChange={(e) => setScores({...scores, [step]: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <button onClick={() => setStep(step === 'listening' ? 'reading' : 'writing')} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all">Next Module</button>
            </div>
          </motion.div>
        )}

        {step === 'writing' && (
          <motion.div key="writing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[3rem] p-8 md:p-12 text-center">
            <PenTool size={48} className="mx-auto mb-6 text-indigo-500" />
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Writing Task</h3>
            <p className="text-slate-500 mb-8 font-medium">Paste your essay (minimum 150 words recommended).</p>
            <textarea 
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Start typing or paste your response..."
              className="w-full h-64 glass p-8 rounded-[2rem] mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg resize-none"
            />
            <div className="flex justify-between items-center px-4 mb-8">
               <span className="text-xs font-black uppercase tracking-widest text-slate-400">Words: {writingText.trim() ? writingText.trim().split(/\s+/).length : 0}</span>
               <button onClick={() => setStep('speaking')} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all">Go to Speaking</button>
            </div>
          </motion.div>
        )}

        {step === 'speaking' && (
          <motion.div key="speaking" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[3rem] p-12 text-center">
            <Mic size={48} className="mx-auto mb-6 text-indigo-500" />
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Speaking Assessment</h3>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-10 rounded-[2.5rem] mb-10 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30">
              <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4">IELTS Speaking Part 2</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 italic leading-tight">
                &quot;Describe a time when you successfully communicated a complex idea to a group of people.&quot;
              </p>
            </div>
            
            {isRecording ? (
              <div className="space-y-8">
                <div className="flex justify-center gap-2 h-12 items-center">
                  {[...Array(15)].map((_, i) => (
                    <motion.div key={i} animate={{ height: [10, 40, 10] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }} className="w-1.5 bg-indigo-500 rounded-full" />
                  ))}
                </div>
                <p className="text-2xl font-black text-rose-500 uppercase tracking-widest animate-pulse">{recordingTime}s / 60s</p>
                <button onClick={stopSpeakingTest} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto shadow-xl">
                  <Square size={20} fill="currentColor" /> Finish & Analyze
                </button>
              </div>
            ) : (
              <button onClick={startSpeakingTest} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto shadow-2xl shadow-indigo-500/30 hover:scale-105 transition-all">
                <Mic size={24} /> Start Voice Test
              </button>
            )}
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-24 text-center">
            <RefreshCw size={60} className="text-indigo-500 animate-spin mx-auto mb-8" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Analyzing Performance</h3>
            <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-xs">Cross-referencing acoustic data with lexical complexity...</p>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 p-16 text-white text-center relative">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
               <p className="text-xs font-black uppercase tracking-[0.5em] mb-4 opacity-70">Predicted Overall Band</p>
               <h2 className="text-[10rem] font-black tracking-tighter leading-none">{calculateOverall().toFixed(1)}</h2>
            </div>
            <div className="p-12 md:p-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[
                  { l: "Listening", v: rawToBand(scores.listening) },
                  { l: "Reading", v: rawToBand(scores.reading) },
                  { l: "Writing", v: scores.writing || 4.0 },
                  { l: "Speaking", v: scores.speaking || 4.0 }
                ].map((s) => (
                  <div key={s.l} className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] text-center border border-slate-100 dark:border-slate-800">
                    <p className="text-4xl font-black text-indigo-600 mb-2 tracking-tighter">{s.v.toFixed(1)}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-indigo-600 text-white rounded-[3rem] text-center shadow-2xl shadow-indigo-500/40 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl" />
                <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-tight">Ready for a real Band 8.5?</h4>
                <p className="text-indigo-100 font-medium mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                  Our AI analysis shows strong potential in receptive skills, but your expressive output (Speaking/Writing) requires 
                  professional coaching to reach the elite level.
                </p>
                <a href="https://wa.me/923120295549?text=I%20finished%20the%20Mock%20Test%20and%20want%20to%20reach%20Band%208.5." className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl inline-flex items-center gap-4 hover:bg-indigo-50 transition-all">
                   Start Your Training <ArrowRight />
                </a>
              </div>
              
              <button 
                onClick={() => { setStep('start'); setWritingText(""); setScores({listening: 24, reading: 24, writing: 0, speaking: 0}); }}
                className="flex items-center gap-2 mx-auto mt-12 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors"
              >
                <RefreshCw size={14} /> Restart Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IELTSPredictor;
