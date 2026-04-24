"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";

export default function BlogContent({ slug }: { slug: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <article>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-indigo-500 mb-6">
            <span className="flex items-center gap-1"><Tag size={12} /> Category</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1"><Clock size={12} /> 10 min read</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
            {slug.split('-').join(' ')}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none font-medium text-slate-700 dark:text-slate-300">
            <p className="text-xl italic border-l-4 border-indigo-500 pl-6 my-10 bg-indigo-50/50 dark:bg-indigo-900/10 py-6 rounded-r-2xl">
              This article is being optimized for your viewing. Please check back in a moment as we finalize the SEO generation for this topic.
            </p>
            
            <p>
              In the meantime, know that at <strong>litgenics</strong>, we specialize in delivering high-impact solutions 
              across both language and technology sectors. Whether you are in Pakistan, the Gulf, or anywhere globally, 
              our goal is to uplift your professional presence.
            </p>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
