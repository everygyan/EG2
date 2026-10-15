import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import RightSidebar from "@/components/magazine/RightSidebar";
import { fallbackCategories, fallbackHeroPost, fallbackLeftStories } from "@/lib/data";

interface SubCategoryPageProps {
  params: Promise<{ slug: string; sub: string }>;
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { slug, sub } = await params;

  // Find parent and child names
  const parentCat = fallbackCategories.find((c) => c.slug === slug);
  const subCat = parentCat?.subcategories?.find((s) => s.slug === sub);

  const parentName = parentCat?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
  const subName = subCat?.name || sub.charAt(0).toUpperCase() + sub.slice(1).replace("-", " ");

  let posts: any[] = [];
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      posts = await prisma.post.findMany({
        where: {
          category: { slug: sub },
          status: "PUBLISHED",
        },
        include: { category: true, tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      console.warn("DB query fallback:", err);
    }
  }

  if (posts.length === 0) {
    posts = [fallbackHeroPost, ...fallbackLeftStories.slice(0, 3)];
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
          <Link href={`/category/${slug}`} className="text-gray-600 hover:text-black">
            {parentName}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#C7102E] font-semibold">{subName}</span>
        </div>

        {/* Header */}
        <div className="border-b-2 border-[#C7102E] pb-3 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#C7102E]">
            {parentName} &bull; Section
          </div>
          <h1 className="text-3xl font-black text-[#111111] font-serif">
            {subName}
          </h1>
          <p className="text-xs text-gray-500">
            Dedicated updates, expert breakdowns, and curated field guides in {subName}.
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
                    {subName}
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
