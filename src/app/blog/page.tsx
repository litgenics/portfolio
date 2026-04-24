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
      category: data.tags?.[0] || "Agency"
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            THE <span className="text-gradient">LITGENICS</span> BLOG
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Insights on language mastery, digital design, and cutting-edge technology.
          </p>
        </header>

        <BlogList blogs={blogs} />
      </div>
    </main>
  );
}
