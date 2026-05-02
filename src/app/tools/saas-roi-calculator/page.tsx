import Navbar from "@/components/Navbar";
import SaasRoiCalculator from "@/components/SaaSRoiCalculator";
import Contact from "@/components/Contact";

export default function SaasRoiCalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-20">
      <Navbar />
      <div className="py-24">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4">Efficiency Audit</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            SAAS ROI <br/> <span className="text-gradient">CALCULATOR</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto px-4">
            Calculate exactly how much manual business processes are costing you and how much you can save through custom automation.
          </p>
        </div>
        <SaasRoiCalculator />
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
