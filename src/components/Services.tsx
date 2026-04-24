"use client";

import { motion } from "framer-motion";
import { 
  Code, Search, Palette, 
  Video, GraduationCap, Mic2, ExternalLink
} from "lucide-react";

const services = [
  {
    title: "English Coaching",
    description: "Master professional & business English to accelerate your global career growth.",
    icon: <Mic2 className="text-orange-500" />,
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-orange-500/10 to-transparent"
  },
  {
    title: "Software Solutions",
    description: "Bespoke full-stack development using cutting-edge technology.",
    icon: <Code className="text-indigo-500" />,
    className: "md:col-span-2",
    gradient: "from-indigo-500/10 to-transparent"
  },
  {
    title: "IELTS & SAT",
    description: "Targeted strategies for academic excellence.",
    icon: <GraduationCap className="text-blue-500" />,
    className: "md:col-span-1",
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    title: "Web Design",
    description: "Premium UI/UX design that converts visitors into customers.",
    icon: <Palette className="text-pink-500" />,
    className: "md:col-span-1",
    gradient: "from-pink-500/10 to-transparent"
  },
  {
    title: "SEO Expert",
    description: "Data-driven strategies to dominate search results.",
    icon: <Search className="text-green-500" />,
    className: "md:col-span-1",
    gradient: "from-green-500/10 to-transparent"
  },
  {
    title: "Video Editing",
    description: "Cinematic storytelling for your brand.",
    icon: <Video className="text-red-500" />,
    className: "md:col-span-1",
    gradient: "from-red-500/10 to-transparent"
  },
];

const Services = () => {
  return (
    <section id="services" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              EXPERT <span className="text-gradient">CAPABILITIES</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              We combine linguistic precision with technical excellence to deliver 
              solutions that stand out in the digital landscape.
            </p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 cursor-pointer"
          >
            <span className="font-bold">View Portfolio</span>
            <ExternalLink size={18} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[180px]">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative glass rounded-[2.5rem] p-8 overflow-hidden flex flex-col justify-end ${service.className}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-snug">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
