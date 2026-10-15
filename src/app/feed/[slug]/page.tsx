import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import RightSidebar from "@/components/magazine/RightSidebar";
import { fallbackHeroPost, fallbackLeftStories } from "@/lib/data";

interface FeedPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FeedPage({ params }: FeedPageProps) {
  const { slug } = await params;
  const feedTitle = slug === "plus" ? "EveryGyan+ Exclusive Feed" : `Feed: ${slug}`;

  const plusStories = [fallbackHeroPost, ...fallbackLeftStories];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-2">
      <div className="flex-1 min-w-0 max-w-[850px] space-y-6">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {/* EveryGyan+ Hero Banner */}
        <div className="bg-linear-to-r from-[#111111] via-[#1c1c24] to-[#2b0c14] text-white p-6 rounded-lg space-y-3 relative overflow-hidden shadow-sm border-l-4 border-[#C7102E]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-[#C7102E] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded">
              <Sparkles className="w-3 h-3" />
              <span>PREMIUM DISPATCHES</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-white">
            {feedTitle}
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
            In-depth analytical essays, long-form investigative journalism, and unconstrained engineering guides curated exclusively for EveryGyan+ readers.
          </p>

          <div className="flex items-center gap-4 pt-2 text-[11px] text-gray-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ad-Free Reading</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Global Perspectives</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Source Code Access</span>
            </span>
          </div>
        </div>

        {/* Plus Articles Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {plusStories.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-sm overflow-hidden flex flex-col group bg-white shadow-2xs"
            >
              {post.featuredImage && (
                <div className="relative w-full h-44 bg-gray-100">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="400px"
                  />
                  <span className="absolute top-2 left-2 bg-[#C7102E] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    PLUS EXCLUSIVE
                  </span>
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-[#C7102E] uppercase tracking-wider block">
                    {post.category?.name || "Exclusive"}
                  </span>
                  <Link href={`/article/${post.slug}`}>
                    <h3 className="font-bold text-base text-[#111111] group-hover:text-[#C7102E] transition line-clamp-2 mt-1 leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-3 mt-1.5 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href={`/article/${post.slug}`}
                  className="text-xs font-semibold text-[#111111] group-hover:text-[#C7102E] inline-flex items-center gap-1 pt-2"
                >
                  Read Analysis →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>

      <RightSidebar />
    </div>
  );
}
