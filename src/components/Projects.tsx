"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Global Brand Identity",
    category: "Graphics Design",
    description: "Developed a comprehensive visual system for a leading tech firm in the Gulf region.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    alt: "Corporate Brand Identity design showing modern minimalist logo and color palette"
  },
  {
    title: "SaaS Enterprise Dashboard",
    category: "Software Solution",
    description: "Built a high-performance dashboard with real-time analytics for a European SaaS client.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    alt: "Complex data visualization dashboard with dark theme and real-time graphs"
  },
  {
    title: "E-Commerce Experience",
    category: "Web Design / SEO",
    description: "Designed and optimized a seamless shopping platform that saw a 40% increase in conversion.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    alt: "Modern mobile-responsive e-commerce website design with high-quality product photography"
  },
  {
    title: "Real Estate Portal",
    category: "Web Design",
    description: "A premium property portal designed for the Azerbaijan luxury real estate market.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    alt: "Luxury real estate website interface showcasing high-end properties and search filters"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-4 bg-slate-50 dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
              SELECTED <span className="text-gradient">WORKS</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              A curated selection of digital experiences and linguistic coaching successes 
              delivered by litgenics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 glass">
                <img 
                  src={project.image} 
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <ArrowUpRight size={32} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start px-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">{project.category}</p>
                  <h3 className="text-3xl font-black tracking-tighter mb-2">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
