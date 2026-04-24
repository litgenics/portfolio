import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogList from "@/components/BlogList";

export default async function BlogPage() {
  const contentDirectory = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(contentDirectory);

  const blogs = files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      title: data.title || filename.replace(".md", "").split('-').join(' '),
      slug: filename.replace(".md", ""),
      date: data.date || "April 2026",
      excerpt: data.description || "Learn how to master language and technology with litgenics.",
      category: data.tags?.[0] || "Agency",
      coverImage: data.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000"
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20 text-slate-900 dark:text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-20 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
            INSIGHTS BY <span className="text-gradient">LITGENICS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Premium perspectives on professional English mastery and cutting-edge software ecosystems.
          </p>
        </header>

        <BlogList blogs={blogs} />
      </div>
    </main>
  );
}
