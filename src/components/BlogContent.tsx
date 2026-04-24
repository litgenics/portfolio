"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export default function BlogContent({ slug, content, data }: { slug: string, content: string, data: any }) {
  const [cleanContent, setCleanContent] = useState(content);
  const [scripts, setScripts] = useState<string[]>([]);

  useEffect(() => {
    // Extract JSON-LD scripts from the content so they don't render as text
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
    const extractedScripts: string[] = [];
    let match;
    let tempContent = content;

    while ((match = scriptRegex.exec(content)) !== null) {
      extractedScripts.push(match[1]);
    }

    // Remove the script tags from the visible markdown
    tempContent = content.replace(scriptRegex, "");
    
    // Also remove any internal SEO labels that might have been left behind
    tempContent = tempContent.replace(/\*\*Claim:\*\*|\*\*Evidence:\*\*|\*\*Interpretation:\*\*|\*\*Direct Answer:\*\*|The Evidence Sandwich:/gi, "");

    setCleanContent(tempContent);
    setScripts(extractedScripts);
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Inject scripts into the DOM head for SEO without showing them to users */}
      {scripts.map((js, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: js }}
        />
      ))}

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
            <span className="flex items-center gap-1"><Tag size={12} /> {data.tags?.[0] || 'Agency'}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1"><Clock size={12} /> 10 min read</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
            {data.title || slug.split('-').join(' ')}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none font-medium text-slate-700 dark:text-slate-300
            prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
            prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {cleanContent}
            </ReactMarkdown>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
