"use client";

import { motion } from "framer-motion";
import { 
  Code, Search, Palette, 
  Video, GraduationCap, Mic2, ExternalLink
} from "lucide-react";

const services = [
  {
    title: "English Coaching",
    description: "Master professional & business English to accelerate your global career growth with personalized coaching sessions.",
    icon: <Mic2 className="text-orange-500" />,
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-orange-500/20 via-orange-500/5 to-transparent"
  },
  {
    title: "Software Solutions",
    description: "Bespoke full-stack development and complete software lifecycle management using modern tech stacks.",
    icon: <Code className="text-indigo-500" />,
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent"
  },
  {
    title: "IELTS & SAT",
    description: "Targeted strategies and intensive prep for academic excellence in global standardized tests.",
    icon: <GraduationCap className="text-blue-500" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent"
  },
  {
    title: "Web Design",
    description: "Premium UI/UX design focused on high-conversion user experiences.",
    icon: <Palette className="text-pink-500" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-pink-500/20 via-pink-500/5 to-transparent"
  },
  {
    title: "SEO Expert",
    description: "Advanced data-driven strategies to dominate global search results.",
    icon: <Search className="text-green-500" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-green-500/20 via-green-500/5 to-transparent"
  },
  {
    title: "Video Editing",
    description: "Professional cinematic storytelling and post-production.",
    icon: <Video className="text-red-500" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-red-500/20 via-red-500/5 to-transparent"
  },
];

const Services = () => {
  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.85]"
            >
              EXPERT <br />
              <span className="text-gradient">CAPABILITIES</span>
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-medium leading-relaxed">
              Precision in language. Excellence in technology. We bridge the gap 
              to deliver digital solutions that command attention.
            </p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-50 dark:bg-slate-900 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 cursor-pointer shadow-xl shadow-indigo-500/5"
          >
            <span className="font-bold uppercase tracking-widest text-sm">Full Portfolio</span>
            <ExternalLink size={18} className="text-indigo-500" />
          </motion.div>
        </div>

        {/* Perfectly Balanced 4-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`group relative glass rounded-[3.5rem] p-10 overflow-hidden flex flex-col justify-end transition-all duration-500 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] border-white/40 dark:border-slate-800/60 ${service.className}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 bg-white/80 dark:bg-slate-800/80">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase leading-none">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-bold text-[13px] uppercase tracking-wider leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default Services;
