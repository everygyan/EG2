import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Clock, Share2, Tag } from "lucide-react";
import prisma from "@/lib/prisma";
import { fallbackHeroPost, fallbackLeftStories, fallbackSubHeroPost } from "@/lib/data";
import RightSidebar from "@/components/magazine/RightSidebar";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Try fetching from database, fallback to matching seed article
  let article: any = null;

  try {
    article = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        author: true,
        tags: { include: { tag: true } },
      },
    });
  } catch (error) {
    console.warn("Database lookup failed, falling back to mock stories:", error);
  }

  if (!article) {
    const allMock = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories];
    article = allMock.find((s) => s.slug === slug);
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
      {/* Article Content Column */}
      <article className="flex-1 min-w-0 max-w-[850px] space-y-6">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C7102E] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Feed</span>
        </Link>

        {/* Category & Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFF0F2] text-[#C7102E] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              {article.category?.name || "Editorial"}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>4 min read</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight font-serif">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed border-l-2 border-[#C7102E] pl-3.5 italic">
              {article.excerpt}
            </p>
          )}

          {/* Author & Published Date */}
          <div className="flex items-center justify-between py-3 border-y border-[#EBEBEF] text-xs text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">By {article.author?.name || "Devansh • EveryGyan Editorial"}</span>
              <span className="mx-2">&bull;</span>
              <span>
                {article.publishedAt
                  ? format(new Date(article.publishedAt), "MMMM d, yyyy")
                  : "October 15, 2026"}
              </span>
            </div>
            <button className="flex items-center gap-1 hover:text-[#C7102E] transition">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 850px"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="prose prose-lg max-w-none text-[#222222] leading-relaxed space-y-4 pt-2 font-sans"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-[#EBEBEF] flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            {article.tags.map((t: any, idx: number) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
              >
                #{t.tag?.name || t.name}
              </span>
            ))}
          </div>
        )}

      </article>

      {/* Right Sidebar Ad Monetization */}
      <RightSidebar />
    </div>
  );
}
