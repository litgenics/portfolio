"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileUser, Download, Plus, Trash2, 
  Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Languages, Cpu, Info 
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const EuropassMaker = () => {
  const [data, setData] = useState({
    firstName: "M. Hamza",
    lastName: "Shaikh",
    email: "litgenics@gmail.com",
    phone: "+92 3XX XXXXXXX",
    address: "Karachi, Pakistan",
    summary: "Professional English Coach and Software Expert with 8+ years of experience in uplifting global careers.",
    experience: [
      { company: "litgenics", position: "Founder & Lead Coach", duration: "2020 - Present", desc: "Leading a multi-disciplinary agency focusing on language mastery and software ecosystems." }
    ],
    education: [
      { school: "University of Excellence", degree: "Master of Computer Science", duration: "2016 - 2020" }
    ],
    skills: ["Business English", "React/Next.js", "SEO Mastery", "UI/UX Design"]
  });

  const cvRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Europass_CV_${data.firstName}_${data.lastName}.pdf`);
  };

  const addExp = () => setData({...data, experience: [...data.experience, { company: "", position: "", duration: "", desc: "" }]});
  const addEdu = () => setData({...data, education: [...data.education, { school: "", degree: "", duration: "" }]});

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Editor Side */}
        <div className="space-y-8 h-[85vh] overflow-y-auto pr-4 custom-scrollbar">
          <section className="glass rounded-3xl p-8 border-white/20">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <FileUser className="text-indigo-500" /> Personal Identity
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="First Name" 
                className="glass-input" 
                value={data.firstName} 
                onChange={(e) => setData({...data, firstName: e.target.value})} 
              />
              <input 
                placeholder="Last Name" 
                className="glass-input" 
                value={data.lastName} 
                onChange={(e) => setData({...data, lastName: e.target.value})} 
              />
              <input 
                placeholder="Email" 
                className="glass-input col-span-2" 
                value={data.email} 
                onChange={(e) => setData({...data, email: e.target.value})} 
              />
              <textarea 
                placeholder="Professional Summary" 
                className="glass-input col-span-2 h-32" 
                value={data.summary} 
                onChange={(e) => setData({...data, summary: e.target.value})} 
              />
            </div>
          </section>

          <section className="glass rounded-3xl p-8 border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tighter">
                <Briefcase className="text-indigo-500" /> Work Experience
              </h3>
              <button onClick={addExp} className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all">
                <Plus size={18} />
              </button>
            </div>
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-4 mb-8 pb-8 border-b border-white/10 last:border-0">
                <input placeholder="Company" className="glass-input" value={exp.company} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[i].company = e.target.value; setData({...data, experience: newExp});
                }} />
                <input placeholder="Position" className="glass-input" value={exp.position} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[i].position = e.target.value; setData({...data, experience: newExp});
                }} />
                <textarea placeholder="Description" className="glass-input h-24" value={exp.desc} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[i].desc = e.target.value; setData({...data, experience: newExp});
                }} />
              </div>
            ))}
          </section>

          <button 
            onClick={downloadPDF}
            className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all sticky bottom-0 z-10"
          >
            <Download size={24} /> Export Professional PDF
          </button>
        </div>

        {/* Preview Side (A4 Scale) */}
        <div className="hidden lg:block sticky top-32 scale-[0.85] origin-top transform transition-all hover:scale-[0.9]">
          <div 
            ref={cvRef}
            className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-[20mm] shadow-2xl mx-auto rounded-sm overflow-hidden"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="flex justify-between items-start border-b-2 border-indigo-600 pb-10 mb-10">
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-900">{data.firstName}</h1>
                <h1 className="text-5xl font-light tracking-tighter uppercase text-slate-500">{data.lastName}</h1>
              </div>
              <div className="text-right text-sm font-medium space-y-1 text-slate-600">
                <p className="flex items-center justify-end gap-2">{data.email} <Mail size={12} /></p>
                <p className="flex items-center justify-end gap-2">{data.phone} <Phone size={12} /></p>
                <p className="flex items-center justify-end gap-2">{data.address} <MapPin size={12} /></p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-1 space-y-10">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <Cpu size={14} /> Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map(s => <span key={s} className="px-2 py-1 bg-slate-100 text-[10px] font-bold rounded">{s}</span>)}
                  </div>
                </section>
                
                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <GraduationCap size={14} /> Education
                  </h4>
                  {data.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                      <p className="text-xs font-black text-slate-900 leading-tight">{edu.degree}</p>
                      <p className="text-[10px] text-slate-500 font-bold">{edu.school}</p>
                      <p className="text-[9px] text-slate-400">{edu.duration}</p>
                    </div>
                  ))}
                </section>
              </div>

              <div className="col-span-2 space-y-10">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <FileUser size={14} /> Profile
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600 font-medium">
                    {data.summary}
                  </p>
                </section>

                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <Briefcase size={14} /> Experience
                  </h4>
                  {data.experience.map((exp, i) => (
                    <div key={i} className="mb-6">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-black text-slate-900">{exp.position}</p>
                        <p className="text-[10px] text-indigo-500 font-black">{exp.duration}</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mb-2">{exp.company}</p>
                      <p className="text-[10px] leading-relaxed text-slate-600">{exp.desc}</p>
                    </div>
                  ))}
                </section>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-slate-100 text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest">
              Generated via litgenics Europass Maker
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glass-input {
          @apply w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          @apply bg-transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          @apply bg-indigo-500/20 rounded-full;
        }
      `}</style>
    </div>
  );
};

export default EuropassMaker;
