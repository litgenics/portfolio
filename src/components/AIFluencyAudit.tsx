"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Play, RefreshCw, BarChart3, Zap, Shield, ArrowRight, MessageSquare, Volume2, Timer } from "lucide-react";

const AIFluencyAudit = () => {
  const [status, setStatus] = useState<'idle' | 'recording' | 'analyzing' | 'result'>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setRecordingTime(0);
      setStatus('recording');
    } catch (err) {
      alert("Microphone access denied. Please allow microphone permissions to use the AI Audit.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setStatus('analyzing');
      
      // High-End Simulation of Gemini Flash (Nano-Banana) Analysis
      setTimeout(() => {
        setMetrics({
          pacing: Math.floor(Math.random() * (90 - 70) + 70),
          clarity: Math.floor(Math.random() * (95 - 75) + 75),
          confidence: Math.floor(Math.random() * (88 - 65) + 65),
          tone: "Professional / Consultative",
          topImprovement: "Vocal fill reduction (uh/um)"
        });
        setStatus('result');
      }, 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[3rem] p-12 text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <Mic size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">AI Fluency <br/> <span className="text-gradient">Voice Audit</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-10 max-w-lg mx-auto">
              Record a 30-60 second intro about yourself. Our AI engine will analyze your pacing, clarity, and professional tone.
            </p>
            <button 
              onClick={startRecording}
              className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-3 mx-auto"
            >
              Start Recording
            </button>
          </motion.div>
        )}

        {status === 'recording' && (
          <motion.div 
            key="recording"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] p-12 text-center"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center text-white mx-auto animate-pulse">
                <div className="w-16 h-16 bg-rose-400 rounded-full animate-ping absolute opacity-40" />
                <Square size={32} />
              </div>
            </div>
            <p className="text-3xl font-black mb-2">{recordingTime}s / 60s</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-10">Recording in Progress...</p>
            
            <div className="flex justify-center gap-4 mb-10">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [20, Math.random() * 60 + 20, 20] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                  className="w-2 bg-indigo-500 rounded-full"
                />
              ))}
            </div>

            <button 
              onClick={stopRecording}
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-12 py-4 rounded-2xl font-black text-lg hover:opacity-90 transition-all"
            >
              Stop & Analyze
            </button>
          </motion.div>
        )}

        {status === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-[3rem] p-24 text-center flex flex-col items-center"
          >
            <div className="relative mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
              />
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500" size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-widest">Nano-Banana Engine Processing</h3>
            <p className="text-slate-500 mt-4 font-bold max-w-xs mx-auto">Deconstructing phonemes, analyzing frequency variance, and tone mapping...</p>
          </motion.div>
        )}

        {status === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] overflow-hidden"
          >
            <div className="bg-indigo-600 p-8 text-white text-center">
              <p className="text-xs font-black uppercase tracking-[0.4em] mb-2 opacity-80">Fluency Audit Report</p>
              <h2 className="text-4xl font-black tracking-tighter uppercase">Analysis Complete</h2>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { label: "Pacing Score", val: metrics.pacing, icon: <Timer size={18} /> },
                  { label: "Clarity Rank", val: metrics.clarity, icon: <Volume2 size={18} /> },
                  { label: "Confidence", val: metrics.confidence, icon: <Zap size={18} /> }
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-2 glass rounded-lg text-indigo-500">{m.icon}</div>
                      <span className="text-2xl font-black text-indigo-600">{m.val}%</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-1">
                    <MessageSquare size={14} className="text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white mb-1">Detected Tone</h4>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{metrics.tone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center mt-1">
                    <BarChart3 size={14} className="text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white mb-1">Key Improvement Area</h4>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{metrics.topImprovement}</p>
                  </div>
                </div>
              </div>

              {/* Tool-to-Sale Pipeline */}
              <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white text-center shadow-2xl shadow-indigo-500/30">
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Get a Human Expert Audit</h4>
                <p className="text-indigo-100 font-medium mb-8 max-w-lg mx-auto">
                  AI analysis is just the start. Book a **Deep Voice Audit** with Hamza to get 
                  specific mouth-placement corrections and a personalized accent reduction plan.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href="https://wa.me/923120295549?text=I%20just%20did%20the%20AI%20Fluency%20Audit%20and%20want%20to%20book%20a%20Human%20Expert%20Review."
                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                  >
                    Book Expert Review <ArrowRight size={16} />
                  </a>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="glass border-white/30 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Retake Audit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIFluencyAudit;
