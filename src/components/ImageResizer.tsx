"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, Download, ImageIcon, Settings2, 
  RefreshCw, CheckCircle2, FileImage, Layers,
  Maximize2, ArrowRight, ShieldCheck, Gauge
} from "lucide-react";

const ImageResizer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalDetails, setOriginalDetails] = useState<{ width: number; height: number; size: number } | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
  const [optimizedDetails, setOptimizedDetails] = useState<{ size: number } | null>(null);
  
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [format, setFormat] = useState<"webp" | "jpeg" | "png">("webp");
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(event.target?.result as string);
          setOriginalDetails({ width: img.width, height: img.height, size: file.size });
          setWidth(img.width);
          setHeight(img.height);
          setOptimizedImage(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (maintainAspect && originalDetails && width !== originalDetails.width) {
      const ratio = originalDetails.height / originalDetails.width;
      setHeight(Math.round(width * ratio));
    }
  }, [width, maintainAspect, originalDetails]);

  const processImage = () => {
    if (!image) return;
    setIsProcessing(true);
    
    // Slight delay to show loading state
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        const mimeType = `image/${format === "webp" ? "webp" : format === "jpeg" ? "jpeg" : "png"}`;
        const dataUrl = canvas.toDataURL(mimeType, quality / 100);
        
        setOptimizedImage(dataUrl);
        
        // Calculate size from base64
        const stringLength = dataUrl.split(",")[1].length;
        const sizeInBytes = Math.floor(stringLength * (3 / 4));
        setOptimizedDetails({ size: sizeInBytes });
        
        setIsProcessing(false);
      };
      img.src = image;
    }, 800);
  };

  const downloadImage = () => {
    if (!optimizedImage) return;
    const link = document.createElement("a");
    link.href = optimizedImage;
    link.download = `litgenics-optimized.${format}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const savings = originalDetails && optimizedDetails 
    ? Math.round(((originalDetails.size - optimizedDetails.size) / originalDetails.size) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 glass rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-3 mb-8">
            <Settings2 className="text-indigo-600" size={24} />
            <h3 className="text-xl font-black uppercase tracking-tight">Optimization</h3>
          </div>

          <div className="space-y-8">
            {/* Dimensions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Dimensions</label>
                <button 
                  onClick={() => setMaintainAspect(!maintainAspect)}
                  className={`text-[10px] font-black uppercase px-2 py-1 rounded-md transition-colors ${maintainAspect ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                >
                  {maintainAspect ? "Lock Aspect Ratio" : "Free Scale"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] mb-1 font-bold text-slate-400 uppercase">Width</p>
                  <input 
                    type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-500/5 border border-slate-500/20 rounded-xl p-3 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <p className="text-[10px] mb-1 font-bold text-slate-400 uppercase">Height</p>
                  <input 
                    type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-500/5 border border-slate-500/20 rounded-xl p-3 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Format */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Output Format</label>
              <div className="grid grid-cols-3 gap-2">
                {["webp", "jpeg", "png"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f as any)}
                    className={`py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${format === f ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-500/5 text-slate-500 hover:bg-slate-500/10"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compression Quality</label>
                <span className="text-sm font-black text-indigo-600">{quality}%</span>
              </div>
              <input 
                type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button
              onClick={processImage}
              disabled={!image || isProcessing}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
            >
              {isProcessing ? <><RefreshCw size={20} className="animate-spin" /> Processing...</> : <><Maximize2 size={20} /> Apply Optimization</>}
            </button>
          </div>
        </motion.div>

        {/* Right: Preview Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upload / Source */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative min-h-[300px] glass rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 ${image ? "border-indigo-500/50 bg-indigo-500/5" : "border-slate-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/5"}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleFileUpload({ target: { files: [file] } } as any);
            }}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
            
            {!image ? (
              <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                  <UploadCloud size={40} />
                </div>
                <h4 className="text-2xl font-black tracking-tight mb-2 uppercase">Drop your image here</h4>
                <p className="text-slate-500 font-medium">Or click to browse from your device</p>
                <div className="mt-8 flex gap-4 justify-center grayscale opacity-50">
                  <ImageIcon size={20} /><FileImage size={20} /><Layers size={20} />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Source Image Loaded</span>
                  </div>
                  <button onClick={() => setImage(null)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Remove</button>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900/5 dark:bg-white/5 p-4 flex items-center justify-center">
                  <img src={image} alt="Source" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                </div>
                {originalDetails && (
                  <div className="mt-6 flex justify-around p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Raw Size</p>
                      <p className="text-lg font-black">{formatSize(originalDetails.size)}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Dimensions</p>
                      <p className="text-lg font-black">{originalDetails.width} × {originalDetails.height}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Results Area */}
          <AnimatePresence>
            {optimizedImage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-[2.5rem] p-8 md:p-12 border-2 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-500">
                  <Gauge size={200} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle2 className="text-emerald-500" size={24} />
                      <h4 className="text-2xl font-black uppercase tracking-tight">Optimization Complete</h4>
                    </div>
                    
                    <div className="space-y-6 mb-10">
                      <div className="flex justify-between items-center p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-black uppercase text-slate-500">New File Size</span>
                        <span className="text-xl font-black text-emerald-600">{formatSize(optimizedDetails?.size || 0)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 rounded-xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
                        <span className="text-xs font-black uppercase opacity-80">Total Space Saved</span>
                        <span className="text-2xl font-black">-{savings}%</span>
                      </div>
                    </div>

                    <button 
                      onClick={downloadImage}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                    >
                      <Download size={20} /> Download Result
                    </button>
                  </div>

                  <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900/10">
                    <img src={optimizedImage} alt="Optimized" className="w-full h-full object-contain" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Business Lead Capture */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
             <div className="relative z-10">
               <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Ready</span>
               </div>
               <h4 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tighter leading-tight">
                 Need a Custom Media <br/> <span className="text-yellow-400">Processing Pipeline?</span>
               </h4>
               <p className="text-indigo-100 text-lg font-medium max-w-xl mb-10 leading-relaxed">
                 We build automated server-side pipelines that can process millions of assets daily with content-aware cropping and instant CDN delivery.
               </p>
               <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3">
                 Discuss Architecture <ArrowRight size={20} />
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageResizer;
