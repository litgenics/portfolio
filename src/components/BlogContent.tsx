"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, Globe, Send, MessageCircle } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export default function BlogContent({ slug, content, data }: { slug: string, content: string, data: any }) {
  const [cleanContent, setCleanContent] = useState(content);
  const [scripts, setScripts] = useState<string[]>([]);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
    const extractedScripts: string[] = [];
    let match;
    let tempContent = content;

    while ((match = scriptRegex.exec(content)) !== null) {
      extractedScripts.push(match[1]);
    }

    tempContent = content.replace(scriptRegex, "");
    tempContent = tempContent.replace(/\*\*Claim:\*\*|\*\*Evidence:\*\*|\*\*Interpretation:\*\*|\*\*Direct Answer:\*\*|The Evidence Sandwich:/gi, "");

    setCleanContent(tempContent);
    setScripts(extractedScripts);
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {scripts.map((js, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: js }} />
      ))}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Share2 size={14} /> Share Article:
          </span>
          <div className="flex gap-2">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"><Globe size={16} /></a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"><Send size={16} /></a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`} target="_blank" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"><MessageCircle size={16} /></a>
          </div>
        </div>
      </div>

      <article>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Cover Image Section */}
          {data.coverImage && (
            <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-indigo-500/10">
              <img 
                src={data.coverImage} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
          )}

          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-500 mb-8">
            <span className="flex items-center gap-1"><Tag size={12} /> {data.tags?.[0] || 'Agency'}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1"><Clock size={12} /> {data.readTime || '12 min'} read</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-12 leading-[0.9] tracking-tighter uppercase text-slate-900 dark:text-white">
            {data.title || slug.split('-').join(' ')}
          </h1>

          {/* Optimized Typography: Spacious and High-End */}
          <div className="prose prose-xl dark:prose-invert max-w-none 
            prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg md:prose-p:text-xl
            prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
            prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:border-b prose-h2:pb-4 prose-h2:border-slate-100 dark:prose-h2:border-slate-800
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-strong:text-indigo-600 dark:prose-strong:text-indigo-400 prose-strong:font-black
            prose-ul:my-10 prose-ul:list-disc prose-ul:pl-8 prose-li:mb-4 prose-li:text-lg
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-[2rem] prose-blockquote:italic prose-blockquote:text-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {cleanContent}
            </ReactMarkdown>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
