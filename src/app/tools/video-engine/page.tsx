import Navbar from "@/components/Navbar";
import VideoEngine from "@/components/VideoEngine";
import Contact from "@/components/Contact";

export default function VideoEnginePage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />
      <div className="py-24">
        <div className="text-center mb-16 px-4">
          <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4">Automation Hub</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            YOUTUBE <br/> <span className="text-gradient">VIDEO ENGINE</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto">
            Automate your content creation. Merge voiceovers with B-roll instantly. Our engine auto-loops visuals to match your audio perfectly using WebAssembly.
          </p>
        </div>
        <VideoEngine />
      </div>
      <Contact />
      
      <footer className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} LITGENICS BY M.HAMZA SHAIKH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}
