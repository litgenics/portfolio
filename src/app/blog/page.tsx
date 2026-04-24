"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

// This is a mock-up of the blog data structure
const blogs = [
  {
    title: "How to Master Business English for Global Success",
    slug: "master-business-english-global-success",
    date: "April 24, 2026",
    excerpt: "Learn how to uplift your professional speaking skills for the international market...",
    category: "English Coaching"
  },
  {
    title: "10 SEO Trends You Cannot Ignore in 2026",
    slug: "seo-trends-2026",
    date: "April 22, 2026",
    excerpt: "Stay ahead of the competition with these vital search engine optimization tips...",
    category: "Tech & SEO"
  },
  // ... more will be populated
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
          >
            THE <span className="text-gradient">LITGENICS</span> BLOG
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Insights on language mastery, digital design, and cutting-edge technology.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-[2.5rem] p-8 flex flex-col group cursor-pointer"
            >
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-indigo-500 mb-6">
                <span>{blog.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span>{blog.date}</span>
              </div>
              <h2 className="text-2xl font-black mb-4 leading-tight group-hover:text-indigo-500 transition-colors">
                {blog.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 line-clamp-3">
                {blog.excerpt}
              </p>
              <Link 
                href={`/blog/${blog.slug}`}
                className="mt-auto flex items-center gap-2 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all"
              >
                Read Article <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
