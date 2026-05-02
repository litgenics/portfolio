import Navbar from "@/components/Navbar";
import SeoHealthCheck from "@/components/SeoHealthCheck";
import Contact from "@/components/Contact";

export default function SeoHealthCheckPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-20">
      <Navbar />
      <div className="py-24">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4">Traffic Optimizer</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            SEO KEYWORD <br/> <span className="text-gradient">HEALTH CHECK</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto px-4">
            Instantly analyze any URL for keyword optimization and critical technical SEO errors.
          </p>
        </div>
        <SeoHealthCheck />
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
