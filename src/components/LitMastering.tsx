"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, Mic, Play, Download, RefreshCw, 
  CheckCircle2, Loader2, AlertCircle,
  FileAudio, ArrowRight, Sparkles, Cpu, Waves
} from "lucide-react";

const LitMastering = () => {
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  const handleTargetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTargetFile(file);
      setOutputUrl(null);
    }
  };

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceFile(file);
      setOutputUrl(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const processMastering = async () => {
    if (!targetFile || !referenceFile) return;
    
    setIsProcessing(true);
    setLogs(["Initializing Python Mastering Engine...", "Scanning spectral fingerprints..."]);

    try {
      const targetData = await fileToBase64(targetFile);
      const referenceData = await fileToBase64(referenceFile);

      setLogs(prev => [...prev, "Matching EQ & Dynamic Range...", "Running Hyrax Brickwall Limiter..."]);

      const response = await fetch("http://localhost:3001/master-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetData,
          referenceData,
          timestamp: Date.now()
        })
      });

      if (!response.ok) throw new Error("Mastering Pro process failed.");

      const result = await response.json();
      setLogs(prev => [...prev, "Mastering Success!", "Cleaning up dynamic filters..."]);
      
      setOutputUrl(result.audioUrl);
      setIsProcessing(false);
    } catch (err: any) {
      console.error(err);
      setLogs(prev => [...prev, `ENGINE ERROR: ${err.message}`]);
      setIsProcessing(false);
      alert("Mastering failed. Please ensure the Python environment and LIT Sidecar are active.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Upload Column */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800"
          >
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                 <Waves className="text-indigo-500" /> Mastering Desk
               </h3>
               <div className="bg-indigo-600/10 text-indigo-600 px-3 py-1.5 rounded-xl flex items-center gap-2 border border-indigo-600/20">
                  <Cpu size={14} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Python Engine</span>
               </div>
            </div>

            <div className="space-y-6">
              {/* Target Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                  Target Track (Unmastered)
                </label>
                <div className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center text-center ${targetFile ? "border-indigo-500/30 bg-indigo-500/5" : "border-slate-200 dark:border-slate-800 hover:border-indigo-500/30"}`}>
                   <input type="file" onChange={handleTargetUpload} accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                   {targetFile ? (
                     <>
                       <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
                       <p className="text-sm font-black uppercase truncate max-w-full px-4">{targetFile.name}</p>
                     </>
                   ) : (
                     <>
                       <Mic className="text-slate-400 mb-2" size={32} />
                       <p className="text-xs font-bold text-slate-500 uppercase">Drop your raw mix</p>
                     </>
                   )}
                </div>
              </div>

              {/* Reference Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                  Reference Track (Professional Master)
                </label>
                <div className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center text-center ${referenceFile ? "border-indigo-500/30 bg-indigo-500/5" : "border-slate-200 dark:border-slate-800 hover:border-indigo-500/30"}`}>
                   <input type="file" onChange={handleReferenceUpload} accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                   {referenceFile ? (
                     <>
                       <CheckCircle2 className="text-indigo-500 mb-2" size={32} />
                       <p className="text-sm font-black uppercase truncate max-w-full px-4">{referenceFile.name}</p>
                     </>
                   ) : (
                     <>
                       <Music className="text-slate-400 mb-2" size={32} />
                       <p className="text-xs font-bold text-slate-500 uppercase">Drop your sonic target</p>
                     </>
                   )}
                </div>
              </div>

              <button
                disabled={!targetFile || !referenceFile || isProcessing}
                onClick={processMastering}
                className="w-full mt-8 bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
              >
                {isProcessing ? (
                  <><Loader2 size={24} className="animate-spin" /> Analog Matching...</>
                ) : (
                  <><RefreshCw size={24} /> Master My Track</>
                )}
              </button>
            </div>
          </motion.div>

          {/* Logs Panel */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass rounded-3xl p-6 bg-slate-900 text-slate-400 font-mono text-[10px] space-y-2 border border-white/5 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-2">
                   <span className="text-indigo-400 font-black uppercase">Mastering Pipeline Logs</span>
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse delay-75" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150" />
                   </div>
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-indigo-500">➜</span> {log}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Column */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 min-h-[500px] flex flex-col justify-center items-center text-center"
          >
            {!outputUrl ? (
              <div className="space-y-6 max-w-sm">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto opacity-50">
                  <Waves size={40} className="text-slate-400" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight">Sonic Analysis</h4>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">
                  Upload your target and reference tracks. Our engine will map the frequency spectrum and loudness to match them perfectly.
                </p>
                <div className="flex justify-center gap-6 mt-8">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500 font-black">EQ</div>
                      <span className="text-[8px] font-black uppercase">Matching</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500 font-black">RMS</div>
                      <span className="text-[8px] font-black uppercase">Loudness</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500 font-black">24B</div>
                      <span className="text-[8px] font-black uppercase">Quality</span>
                   </div>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-500/20">
                   <CheckCircle2 size={64} />
                </div>
                <h4 className="text-4xl font-black uppercase tracking-tighter mb-4">Master Ready</h4>
                <p className="text-slate-500 font-medium mb-12">Your track has been optimized for global distribution.</p>
                
                <div className="w-full mb-12 p-6 glass rounded-2xl border border-border">
                  <audio 
                    src={outputUrl} 
                    controls 
                    className="w-full h-12 rounded-xl"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full px-8">
                  <button 
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = outputUrl;
                      link.download = "litgenics-pro-master.wav";
                      link.click();
                    }}
                    className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-700 transition-all"
                  >
                    <Download size={24} /> Download WAV
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Marketing CTA */}
          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden group">
             <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Music size={300} />
             </div>
             <div className="relative z-10">
                <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
                   Audio <span className="text-yellow-400">Consultancy</span>
                </h4>
                <p className="text-indigo-100 font-medium mb-8 text-sm opacity-80 leading-relaxed max-w-md">
                   We build custom DSP (Digital Signal Processing) tools and automated audio pipelines for studios and podcast networks.
                </p>
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center gap-3">
                   Start Audio Project <ArrowRight size={16} />
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LitMastering;
