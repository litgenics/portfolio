"use client";

import { motion } from "framer-motion";
import { 
  Code, Search, Palette, 
  Video, GraduationCap, Mic2, ArrowUpRight 
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "English Coaching",
    description: "Professional & Business English mastery for global executives and students looking to uplift their careers.",
    icon: <Mic2 size={24} />,
    color: "from-orange-500 to-amber-500"
  },
  {
    id: "02",
    title: "Software Solutions",
    description: "End-to-end full-stack development. We build scalable, high-performance software using any modern tech stack.",
    icon: <Code size={24} />,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "03",
    title: "IELTS & SAT Prep",
    description: "Intensive training programs designed to achieve top-tier scores in international standardized examinations.",
    icon: <GraduationCap size={24} />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "04",
    title: "Web Design",
    description: "Bespoke UI/UX design that combines aesthetic beauty with high-conversion user experience principles.",
    icon: <Palette size={24} />,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: "05",
    title: "SEO Expert",
    description: "Dominate search rankings with data-driven optimization strategies tailored for the 2026 digital landscape.",
    icon: <Search size={24} />,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "06",
    title: "Video Editing",
    description: "Cinematic post-production and storytelling for brands looking to capture attention on modern social platforms.",
    icon: <Video size={24} />,
    color: "from-red-500 to-orange-500"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-32 px-4 relative bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm mb-4"
          >
            Services & Expertise
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight"
          >
            EXPERT <span className="text-gradient">CAPABILITIES</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-slate-100 dark:border-slate-800/50">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-12 border-r border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors duration-500"
            >
              {/* Service Number */}
              <span className="absolute top-8 right-12 text-sm font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/20 transition-colors">
                {service.id}
              </span>

              {/* Icon with Dynamic Gradient Background */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[15px] flex items-center justify-center text-slate-900 dark:text-white">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 tracking-tight uppercase group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Learn More <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="h-px w-20 bg-slate-200 dark:bg-slate-800 mb-12" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm text-center mb-8">
            Need a custom solution for your business?
          </p>
          <a 
            href="#contact" 
            className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
