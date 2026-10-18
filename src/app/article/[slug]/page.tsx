import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, UserCircle, BookOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import { fallbackHeroPost, fallbackLeftStories, fallbackSubHeroPost } from "@/lib/data";
import RightSidebar from "@/components/magazine/RightSidebar";
import ArticleInteractiveBar from "@/components/magazine/ArticleInteractiveBar";
import { injectInArticleAds } from "@/lib/adInjector";
import { formatArticleDate, formatReadingTime } from "@/lib/formatters";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const allMock = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories];
  const article = allMock.find((s) => s.slug === slug);

  return {
    title: `${article?.title || "Dispatch"} — EveryGyan`,
    description: article?.excerpt || "EveryGyan Editorial coverage and global insights.",
    openGraph: {
      title: article?.title,
      description: article?.excerpt,
      images: article?.featuredImage ? [article.featuredImage] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: any = null;

  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
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
  }

  if (!article) {
    const allMock = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories];
    article = allMock.find((s) => s.slug === slug);
  }

  if (!article) {
    notFound();
  }

  // Calculate approximate reading time
  const wordCount = article.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 200;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Related articles (exclude current)
  const relatedStories = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories]
    .filter((s) => s.slug !== slug)
    .slice(0, 2);

  // Structured Schema.org Article JSON-LD for Google SEO & AdSense compliance
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage ? [article.featuredImage] : [],
    datePublished: article.publishedAt || new Date().toISOString(),
    author: [
      {
        "@type": "Person",
        name: article.author?.name || "Devansh",
        jobTitle: "Editor-in-Chief",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "EveryGyan Media",
      url: "https://everygyan.com",
    },
  };

  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-2">
        {/* Article Content Column */}
        <article className="flex-1 min-w-0 max-w-[850px] space-y-6">
          
          {/* Navigation Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C7102E] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Feed</span>
            </Link>
            <span className="text-xs text-gray-400">
              {article.category?.name || "Journalism"}
            </span>
          </div>

          {/* Category & Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-[#FFF0F2] text-[#C7102E] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                {article.category?.name || "Editorial"}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatReadingTime(readTimeMinutes)}</span>
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

            {/* Author, Date & Interactive Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-y border-[#EBEBEF] text-xs text-gray-600 gap-3">
              <div>
                <span className="font-semibold text-gray-900">
                  By {article.author?.name || "Devansh • EveryGyan Editorial"}
                </span>
                <span className="mx-2">&bull;</span>
                <span>
                  {formatArticleDate(article.publishedAt || "Oct 15, 2026")}
                </span>
              </div>

              {/* Interactive Share Bar with Reading Progress */}
              <ArticleInteractiveBar title={article.title} />
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

          {/* Article Body with Dynamic Ad Injection */}
          <div
            className="prose prose-lg max-w-none text-[#222222] leading-relaxed space-y-4 pt-2 font-sans"
            dangerouslySetInnerHTML={{ __html: injectInArticleAds(article.content) }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-[#EBEBEF] flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              {article.tags.map((t: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/search?q=${encodeURIComponent(t.tag?.name || t.name)}`}
                  className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded hover:bg-[#FFF0F2] hover:text-[#C7102E] transition"
                >
                  #{t.tag?.name || t.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author Bio Box */}
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0">
              D
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900">
                {article.author?.name || "Devansh"}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Editor-in-Chief & Architect at EveryGyan. Writing on software architecture, AI engineering, travel memoirs, and global socio-economic shifts.
              </p>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <BookOpen className="w-4 h-4 text-[#C7102E]" />
              <span>Related Dispatches from EveryGyan</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/article/${story.slug}`}
                  className="p-3.5 border border-gray-200 rounded hover:border-[#C7102E] transition group block space-y-1.5"
                >
                  <span className="text-[10px] font-bold text-[#C7102E] uppercase">
                    {story.category?.name || "Dispatch"}
                  </span>
                  <h5 className="text-xs font-bold text-gray-900 group-hover:text-[#C7102E] line-clamp-2 leading-snug">
                    {story.title}
                  </h5>
                </Link>
              ))}
            </div>
          </div>

        </article>

        {/* Right Sidebar Ad Monetization */}
        <RightSidebar />
      </div>
    </>
  );
}
