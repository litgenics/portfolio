import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      
      <footer className="py-12 border-t border-gray-100 dark:border-slate-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} litgenics by M.Hamza Shaikh. All rights reserved.</p>
      </footer>
    </main>
  );
}
