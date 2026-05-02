import Navbar from "@/components/Navbar";
import VocabFlashcards from "@/components/VocabFlashcards";
import Contact from "@/components/Contact";

export default function VocabFlashcardsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-20">
      <Navbar />
      <div className="py-24">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4">Vocabulary Builder</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            VOCABULARY <br/> <span className="text-gradient">FLASHCARDS</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto px-4">
            Master high-impact industry terms with interactive 3D flashcards designed for professional growth.
          </p>
        </div>
        <VocabFlashcards />
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
