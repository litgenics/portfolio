import Navbar from "@/components/Navbar";
import BusinessEnglishQuiz from "@/components/BusinessEnglishQuiz";
import Contact from "@/components/Contact";

export default function BusinessEnglishQuizPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-20">
      <Navbar />
      <div className="py-24">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4">Lead Magnet Tool</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            RANK YOUR <br/> <span className="text-gradient">BUSINESS ENGLISH</span>
          </h1>
        </div>
        <BusinessEnglishQuiz />
      </div>
      <Contact />
      
      <footer className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} LITGENICS BY M.HAMZA SHAIKH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}
