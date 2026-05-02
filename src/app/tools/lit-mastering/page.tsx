import Navbar from "@/components/Navbar";
import LitMastering from "@/components/LitMastering";
import Contact from "@/components/Contact";

export default function LitMasteringPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />
      <div className="py-24">
        <div className="text-center mb-16 px-4">
          <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4">Engineering Suite</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            LIT-MASTERING <br/> <span className="text-gradient">PRO</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto">
            Automated reference-based mastering. Upload your raw mix and a reference track to match the loudness, EQ, and stereo width of professional masters.
          </p>
        </div>
        <LitMastering />
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
