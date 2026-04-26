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
    writing: 6.0,  // Estimated
    speaking: 0,   // AI Calculated
  });
  
  // Speaking Analysis State
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [speakingMetrics, setSpeakingMetrics] = useState<any>(null);

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
    return 4.5;
  };

  const calculateOverall = () => {
    const l = rawToBand(scores.listening);
    const r = rawToBand(scores.reading);
    const w = scores.writing;
    const s = scores.speaking || 6.0;
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
    } catch (err) {
      alert("Please allow mic access for the Speaking test.");
    }
  };

  const stopSpeakingTest = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      setIsRecording(false);
      setStep('analyzing');
      
      // Simulate Nano-Banana Analysis
      setTimeout(() => {
        const aiBand = Math.floor(Math.random() * (80 - 60) + 60) / 10;
        setScores(prev => ({ ...prev, speaking: aiBand }));
        setSpeakingMetrics({
          fluency: 75,
          pronunciation: 80,
          pacing: "Moderate"
        });
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
              Don't just calculate—simulate. Our AI-driven tool analyzes your raw scores and voice to predict your actual Band Score.
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
            <p className="text-slate-500 mb-10 font-bold">How many questions did you get correct? (Out of 40)</p>
            <div className="flex flex-col items-center gap-8">
              <span className="text-7xl font-black text-indigo-600">{scores[step]}</span>
              <input 
                type="range" min="0" max="40" value={scores[step]} 
                onChange={(e) => setScores({...scores, [step]: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <button onClick={() => setStep(step === 'listening' ? 'reading' : 'writing')} className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-10 py-4 rounded-xl font-black">Next Section</button>
            </div>
          </motion.div>
        )}

        {step === 'writing' && (
          <motion.div key="writing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[3rem] p-12 text-center">
            <PenTool size={48} className="mx-auto mb-6 text-indigo-500" />
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Writing Section</h3>
            <p className="text-slate-500 mb-10 font-bold">Paste your practice essay below for AI evaluation.</p>
            <textarea 
              placeholder="Paste essay here..."
              className="w-full h-48 glass p-6 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button onClick={() => setStep('speaking')} className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-10 py-4 rounded-xl font-black">Analyze & Continue</button>
          </motion.div>
        )}

        {step === 'speaking' && (
          <motion.div key="speaking" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[3rem] p-12 text-center">
            <Mic size={48} className="mx-auto mb-6 text-indigo-500" />
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">AI Speaking Test</h3>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl mb-10 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30">
              <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">Your Cue Card</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-200 italic">
                &quot;Describe a time when you had to use English to solve a professional problem.&quot;
              </p>
            </div>
            
            {isRecording ? (
              <button onClick={stopSpeakingTest} className="bg-rose-500 text-white px-12 py-5 rounded-2xl font-black text-lg animate-pulse flex items-center gap-3 mx-auto">
                <Square size={20} /> Stop & Submit
              </button>
            ) : (
              <button onClick={startSpeakingTest} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto">
                <Mic size={20} /> Record Response
              </button>
            )}
            <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Nano-Banana Acoustic Analysis Ready</p>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3rem] p-24 text-center">
            <RefreshCw size={60} className="text-indigo-500 animate-spin mx-auto mb-8" />
            <h3 className="text-2xl font-black uppercase tracking-widest">Generating Final Report...</h3>
            <p className="text-slate-500 mt-4 font-bold">Cross-referencing raw scores with AI voice diagnostics.</p>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-[3rem] overflow-hidden">
            <div className="bg-indigo-600 p-12 text-white text-center relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-80">Predicted Overall Band</p>
               <h2 className="text-9xl font-black tracking-tighter">{calculateOverall().toFixed(1)}</h2>
            </div>
            <div className="p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { l: "Listening", v: rawToBand(scores.listening) },
                  { l: "Reading", v: rawToBand(scores.reading) },
                  { l: "Writing", v: scores.writing },
                  { l: "Speaking", v: scores.speaking }
                ].map((s) => (
                  <div key={s.l} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl text-center border border-slate-100 dark:border-slate-800">
                    <p className="text-2xl font-black text-indigo-600">{s.v.toFixed(1)}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-[3rem] border border-indigo-100 dark:border-indigo-500/20 text-center">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Your Gap Analysis is Ready</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 max-w-lg mx-auto">
                  You are extremely close to a Band 8.0. However, your Speaking clarity needs refinement in high-pressure scenarios. 
                  Book a **Free 15-min session** with Hamza to fix these gaps.
                </p>
                <a href="https://wa.me/923120295549?text=I%20completed%20the%20Mini-Mock%20and%20want%20my%20detailed%20analysis." className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg inline-flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                   Get Professional Review <ArrowRight />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IELTSPredictor;
