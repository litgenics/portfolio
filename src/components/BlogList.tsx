"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Blog {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage: string;
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {blogs.map((blog, i) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          className="group flex flex-col cursor-pointer"
        >
          <Link href={`/blog/${blog.slug}`} className="block overflow-hidden rounded-[2.5rem] mb-8 shadow-xl shadow-indigo-500/5 aspect-[16/10]">
            <img 
              src={blog.coverImage} 
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-500 mb-6">
            <span>{blog.category}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{blog.date}</span>
          </div>

          <h2 className="text-3xl font-black mb-4 leading-[1.1] group-hover:text-indigo-500 transition-colors uppercase tracking-tight">
            {blog.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 line-clamp-2 leading-relaxed text-lg">
            {blog.excerpt}
          </p>

          <Link 
            href={`/blog/${blog.slug}`}
            className="mt-auto flex items-center gap-2 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all"
          >
            Explore Article <ArrowRight size={16} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
