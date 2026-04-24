"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const Stats = () => {
  const stats = [
    { label: "Success Rate", value: "99%" },
    { label: "Happy Clients", value: "500+" },
    { label: "Projects Done", value: "1.2k" },
    { label: "Exp. Years", value: "8+" },
  ];

  return (
    <section className="py-20 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">{stat.value}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Contact />
      
      <footer className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
             <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              LITGENICS
            </span>
          </div>
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} DESIGNED BY M.HAMZA SHAIKH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
