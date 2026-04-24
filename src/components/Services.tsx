"use client";

import { motion } from "framer-motion";
import { 
  Languages, Code, Search, Palette, 
  Video, Laptop, GraduationCap, Mic2 
} from "lucide-react";

const services = [
  {
    title: "English Coaching",
    description: "Professional & business English speaking skills to uplift your career.",
    icon: <Mic2 className="text-orange-500" />,
    color: "bg-orange-50",
    darkColor: "dark:bg-orange-900/20"
  },
  {
    title: "IELTS & SAT Prep",
    description: "Expert guidance for competitive scores in IELTS and SAT exams.",
    icon: <GraduationCap className="text-blue-500" />,
    color: "bg-blue-50",
    darkColor: "dark:bg-blue-900/20"
  },
  {
    title: "Software Solutions",
    description: "Complete software development using any modern tech stack.",
    icon: <Code className="text-indigo-500" />,
    color: "bg-indigo-50",
    darkColor: "dark:bg-indigo-900/20"
  },
  {
    title: "Web Design",
    description: "Beautiful, responsive, and user-centric website designs.",
    icon: <Palette className="text-pink-500" />,
    color: "bg-pink-50",
    darkColor: "dark:bg-pink-900/20"
  },
  {
    title: "SEO Expert",
    description: "Optimize your online presence and rank higher on search engines.",
    icon: <Search className="text-green-500" />,
    color: "bg-green-50",
    darkColor: "dark:bg-green-900/20"
  },
  {
    title: "Video Editing",
    description: "Professional video editing and post-production for all platforms.",
    icon: <Video className="text-red-500" />,
    color: "bg-red-50",
    darkColor: "dark:bg-red-900/20"
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How I Can Help You</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From mastering a new language to building the next big app, I provide 
            comprehensive solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl ${service.color} ${service.darkColor} border border-transparent hover:border-indigo-500/30 transition-all`}
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
