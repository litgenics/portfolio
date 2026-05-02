"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Music, Play, Download, RefreshCw, 
  CheckCircle2, Loader2, AlertCircle,
  FileVideo, FileAudio, ArrowRight, Sparkles, Cpu
} from "lucide-react";

const VideoEngine = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoDur, setVideoDur] = useState(0);
  const [audioDur, setAudioDur] = useState(0);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      const tempVideo = document.createElement("video");
      tempVideo.src = url;
      tempVideo.onloadedmetadata = () => {
        setVideoDur(tempVideo.duration);
        URL.revokeObjectURL(url);
      };
      setOutputUrl(null);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      const tempAudio = document.createElement("audio");
      tempAudio.src = url;
      tempAudio.onloadedmetadata = () => {
        setAudioDur(tempAudio.duration);
        URL.revokeObjectURL(url);
      };
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

  const processVideo = async () => {
    if (!videoFile || !audioFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    setLogs(["Preparing assets for LIT-Studio Pro...", "Sending assets to background engine..."]);

    try {
      const videoData = await fileToBase64(videoFile);
      const audioData = await fileToBase64(audioFile);

      setLogs(prev => [...prev, "Native rendering started (Using full CPU power)..."]);

      const response = await fetch("http://localhost:3001/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoData,
          audioData,
          videoDur,
          audioDur,
          timestamp: Date.now()
        })
      });

      if (!response.ok) throw new Error("Studio Pro rendering failed.");

      const result = await response.json();
      setLogs(prev => [...prev, "Render Complete!", "Fetching final high-quality output..."]);
      
      setOutputUrl(result.videoUrl);
      setIsProcessing(false);
    } catch (err: any) {
      console.error(err);
      setLogs(prev => [...prev, `STUDIO ERROR: ${err.message}`]);
      setIsProcessing(false);
      alert("Processing failed. Make sure the LIT-Studio sidecar server is running!");
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
                 <Play className="text-red-600" /> Source Assets
               </h3>
               <div className="bg-indigo-600/10 text-indigo-600 px-3 py-1.5 rounded-xl flex items-center gap-2 border border-indigo-600/20">
                  <Cpu size={14} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">LIT-Studio Pro</span>
               </div>
            </div>

            <div className="space-y-6">
              {/* Video Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between px-2">
                  <span>Visual Clip (B-Roll)</span>
                  {videoDur > 0 && <span className="text-indigo-600">{videoDur.toFixed(1)}s</span>}
                </label>
                <div className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center text-center ${videoFile ? "border-emerald-500/30 bg-emerald-500/5" : "border-slate-200 dark:border-slate-800 hover:border-indigo-500/30"}`}>
                   <input type="file" onChange={handleVideoUpload} accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                   {videoFile ? (
                     <>
                       <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
                       <p className="text-sm font-black uppercase truncate max-w-full px-4">{videoFile.name}</p>
                     </>
                   ) : (
                     <>
                       <FileVideo className="text-slate-400 mb-2" size={32} />
                       <p className="text-xs font-bold text-slate-500 uppercase">Drop Background Video</p>
                     </>
                   )}
                </div>
              </div>

              {/* Audio Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between px-2">
                  <span>Audio Track (Voiceover)</span>
                  {audioDur > 0 && <span className="text-indigo-600">{audioDur.toFixed(1)}s</span>}
                </label>
                <div className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center text-center ${audioFile ? "border-emerald-500/30 bg-emerald-500/5" : "border-slate-200 dark:border-slate-800 hover:border-indigo-500/30"}`}>
                   <input type="file" onChange={handleAudioUpload} accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                   {audioFile ? (
                     <>
                       <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
                       <p className="text-sm font-black uppercase truncate max-w-full px-4">{audioFile.name}</p>
                     </>
                   ) : (
                     <>
                       <FileAudio className="text-slate-400 mb-2" size={32} />
                       <p className="text-xs font-bold text-slate-500 uppercase">Drop Audio File</p>
                     </>
                   )}
                </div>
              </div>

              <button
                disabled={!videoFile || !audioFile || isProcessing}
                onClick={processVideo}
                className="w-full mt-8 bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
              >
                {isProcessing ? (
                  <><Loader2 size={24} className="animate-spin" /> Rendering in Studio...</>
                ) : (
                  <><RefreshCw size={24} /> High-Speed Generation</>
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
                   <span className="text-indigo-400 font-black uppercase">Studio Pipeline Logs</span>
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
                  <Play size={40} className="text-slate-400" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight">Studio Preview</h4>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">
                  Upload your assets to begin. Our engine will automatically loop the visuals to match your audio perfectly.
                </p>
                <div className="flex justify-center gap-4 text-slate-300">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl border border-dashed border-slate-300 flex items-center justify-center"><Video size={16} /></div>
                      <span className="text-[8px] font-black uppercase">MP4 / MOV</span>
                   </div>
                   <div className="text-slate-200 self-center">...</div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl border border-dashed border-slate-300 flex items-center justify-center"><Music size={16} /></div>
                      <span className="text-[8px] font-black uppercase">MP3 / WAV</span>
                   </div>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-2xl mb-10 border-4 border-white dark:border-slate-800">
                  <video 
                    ref={videoPreviewRef}
                    src={outputUrl} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full px-8">
                  <button 
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = outputUrl;
                      link.download = "litgenics-studio-pro.mp4";
                      link.click();
                    }}
                    className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-700 transition-all"
                  >
                    <Download size={24} /> Download MP4
                  </button>
                  <button 
                    onClick={() => setOutputUrl(null)}
                    className="px-8 bg-slate-100 dark:bg-slate-800 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    Discard
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Marketing CTA */}
          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden group">
             <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Video size={300} />
             </div>
             <div className="relative z-10">
                <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
                   Dominate <span className="text-yellow-400">Content Ops</span>
                </h4>
                <p className="text-indigo-100 font-medium mb-8 text-sm opacity-80 leading-relaxed max-w-md">
                   We automate content creation workflows for agencies. From voiceover synthesis to automated B-roll assembly.
                </p>
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center gap-3">
                   Scale your Channel <ArrowRight size={16} />
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoEngine;
