import Navbar from "@/components/Navbar";
import BlogContent from "@/components/BlogContent";

export async function generateStaticParams() {
  const slugs = [
    "master-business-english-global-success",
    "seo-trends-2026",
    "ielts-speaking-success-strategies",
    "web-design-vital-for-agencies",
    "sat-preparation-online-students",
    "digital-transformation-tech-stack",
    "graphic-design-brand-identity",
    "video-editing-social-media",
    "private-online-tuitions-learning",
    "litgenics-software-solutions"
  ];

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20">
      <Navbar />
      <BlogContent slug={slug} />
    </main>
  );
}
