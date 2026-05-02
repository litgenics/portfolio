"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Send, X, CheckCircle2, Loader2, MessageSquarePlus, ClipboardPaste, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";

const VisualFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'capturing' | 'sending' | 'success'>('idle');

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setPastedImage(event.target?.result as string);
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const handleSend = async () => {
    setStatus(pastedImage ? 'sending' : 'capturing');
    
    let imageToSend = pastedImage;

    try {
      if (!imageToSend) {
        // Fallback to auto-capture if no image was pasted
        const canvas = await html2canvas(document.body, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: window.getComputedStyle(document.body).backgroundColor,
          logging: false,
          ignoreElements: (element) => element.id === "visual-feedback-tool"
        });
        imageToSend = canvas.toDataURL("image/png");
      }
      
      setStatus('sending');

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageToSend,
          note: note || "No note provided.",
          timestamp: Date.now()
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setNote("");
          setPastedImage(null);
          setIsOpen(false);
        }, 2000);
      } else {
        throw new Error("Failed to send feedback");
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Error saving feedback. Make sure the sidecar server is running!");
    }
  };

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div id="visual-feedback-tool" className="fixed bottom-8 left-8 z-[999]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Camera size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-[320px] glass rounded-[2rem] p-6 shadow-2xl border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="text-indigo-500" size={20} />
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-500">Visual Debugger</h4>
              </div>
              {pastedImage && (
                <button 
                  onClick={() => setPastedImage(null)}
                  className="text-[10px] font-black text-red-500 uppercase tracking-tighter hover:underline"
                >
                  Clear Image
                </button>
              )}
            </div>

            {pastedImage ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border-2 border-indigo-500/30 bg-slate-900">
                <img src={pastedImage} alt="Pasted" className="w-full h-full object-contain" />
                <div className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                  <ClipboardPaste size={10} /> Image Pasted
                </div>
              </div>
            ) : (
              <div className="w-full py-4 border-2 border-dashed border-slate-500/20 rounded-xl mb-4 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={24} className="mb-2 opacity-20" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Pasted image will show here</p>
              </div>
            )}

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onPaste={handlePaste}
              placeholder="Ctrl+V to paste screenshot or type a note..."
              className="w-full h-32 p-4 rounded-xl bg-slate-500/5 border border-slate-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm resize-none mb-6"
            />

            <button
              disabled={status !== 'idle'}
              onClick={handleSend}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {status === 'idle' && (
                pastedImage ? <><Send size={16} /> Send Pasted Image</> : <><Camera size={16} /> Capture & Send</>
              )}
              {status === 'capturing' && <><Loader2 size={16} className="animate-spin" /> Capturing...</>}
              {status === 'sending' && <><Loader2 size={16} className="animate-spin" /> Uploading...</>}
              {status === 'success' && <><CheckCircle2 size={16} /> Received!</>}
            </button>
            
            <p className="mt-4 text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">
              {pastedImage ? "Using your pasted screenshot" : "No paste? I'll auto-capture the page"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisualFeedback;
