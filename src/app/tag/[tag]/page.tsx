import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Tag, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import RightSidebar from "@/components/magazine/RightSidebar";
import { fallbackHeroPost, fallbackLeftStories, fallbackSubHeroPost } from "@/lib/data";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).replace(/-/g, " ");
  const tagTitle = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  let posts: any[] = [];
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      posts = await prisma.post.findMany({
        where: {
          tags: {
            some: {
              tag: {
                OR: [
                  { slug: tag.toLowerCase() },
                  { name: { contains: decodedTag } },
                ],
              },
            },
          },
          status: "PUBLISHED",
        },
        include: { category: true, tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      console.warn("DB tag search fallback:", err);
    }
  }

  // Graceful fallback if no direct tag records in local seed
  if (posts.length === 0) {
    posts = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories.slice(0, 2)];
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-2">
      <div className="flex-1 min-w-0 max-w-[850px] space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs">
          <Link href="/" className="text-gray-500 hover:text-black flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Topic</span>
          <span className="text-gray-400">/</span>
          <span className="text-[#C7102E] font-semibold">#{decodedTag}</span>
        </div>

        {/* Tag Masthead */}
        <div className="border-b-2 border-[#C7102E] pb-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C7102E]">
            <Tag className="w-3.5 h-3.5" />
            <span>Curated Topic Feed</span>
          </div>
          <h1 className="text-3xl font-black text-[#111111] font-serif">
            #{tagTitle}
          </h1>
          <p className="text-xs text-gray-500">
            Latest investigative analysis, technical articles, and essays filed under &quot;{decodedTag}&quot;.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {posts.map((post) => (
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
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-[#C7102E] uppercase tracking-wider block">
                    {post.category?.name || "Topic"}
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
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                  <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>3 min</span>
                  </span>
                  <Link
                    href={`/article/${post.slug}`}
                    className="font-semibold text-[#111111] group-hover:text-[#C7102E] transition"
                  >
                    Read Story →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      <RightSidebar />
    </div>
  );
}
