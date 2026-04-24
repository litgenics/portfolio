import Navbar from "@/components/Navbar";
import BlogContent from "@/components/BlogContent";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(contentDirectory);

  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contentDirectory = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(contentDirectory, `${slug}.md`);
  
  let content = "";
  let data = {};

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = matter(fileContent);
    content = parsed.content;
    data = parsed.data;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20">
      <Navbar />
      <BlogContent slug={slug} content={content} data={data} />
    </main>
  );
}
