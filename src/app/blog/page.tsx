"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "Master Business English for Global Success",
    slug: "master-business-english-global-success",
    date: "April 24, 2026",
    excerpt: "Learn how to uplift your professional speaking skills for the international market with expert coaching.",
    category: "English Coaching"
  },
  {
    title: "IELTS Speaking Success Strategies",
    slug: "ielts-speaking-success-strategies",
    date: "April 24, 2026",
    excerpt: "Expert tips and strategies to achieve a high band score in your IELTS speaking test.",
    category: "English Coaching"
  },
  {
    title: "10 SEO Trends You Cannot Ignore in 2026",
    slug: "seo-trends-2026",
    date: "April 22, 2026",
    excerpt: "Stay ahead of the competition with these vital search engine optimization tips for the modern web.",
    category: "Tech & SEO"
  },
  {
    title: "Why Modern Web Design is Vital for Agencies",
    slug: "web-design-vital-for-agencies",
    date: "April 20, 2026",
    excerpt: "Discover why a premium digital presence is no longer optional for growing agencies.",
    category: "Web Design"
  },
  {
    title: "SAT Preparation for Online Students",
    slug: "sat-preparation-online-students",
    date: "April 18, 2026",
    excerpt: "Master the SAT from the comfort of your home with our specialized online tuition programs.",
    category: "Education"
  },
  {
    title: "Digital Transformation: The Right Tech Stack",
    slug: "digital-transformation-tech-stack",
    date: "April 16, 2026",
    excerpt: "Choosing the right technology is the first step toward a successful digital transformation.",
    category: "Software"
  },
  {
    title: "Graphic Design for Brand Identity",
    slug: "graphic-design-brand-identity",
    date: "April 14, 2026",
    excerpt: "Learn how professional graphics can define and elevate your brand's unique identity.",
    category: "Design"
  },
  {
    title: "Video Editing for Modern Social Media",
    slug: "video-editing-social-media",
    date: "April 12, 2026",
    excerpt: "Short-form video is king. Here is how to edit your content for maximum engagement.",
    category: "Creative"
  },
  {
    title: "Private Online Tuitions: The Future of Learning",
    slug: "private-online-tuitions-learning",
    date: "April 10, 2026",
    excerpt: "Personalized learning is evolving. Explore the benefits of one-on-one online tuitions.",
    category: "Education"
  },
  {
    title: "Complete Software Solutions by litgenics",
    slug: "litgenics-software-solutions",
    date: "April 08, 2026",
    excerpt: "See how our agency builds end-to-end software that solves real-world business problems.",
    category: "Software"
  }
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
