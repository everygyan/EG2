import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import RightSidebar from "@/components/magazine/RightSidebar";
import { fallbackCategories, fallbackLeftStories, fallbackHeroPost } from "@/lib/data";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Find category details
  let categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
  const found = fallbackCategories.find((c) => c.slug === slug);
  if (found) categoryName = found.name;

  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: {
        category: {
          OR: [{ slug }, { parent: { slug } }],
        },
        status: "PUBLISHED",
      },
      include: { category: true, tags: { include: { tag: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB query failed, fallback used:", err);
  }

  if (posts.length === 0) {
    posts = [fallbackHeroPost, ...fallbackLeftStories];
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
      <div className="flex-1 min-w-0 max-w-[850px] space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs">
          <Link href="/" className="text-gray-500 hover:text-black flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#C7102E] font-semibold">{categoryName}</span>
        </div>

        {/* Category Masthead */}
        <div className="border-b-2 border-[#C7102E] pb-3">
          <h1 className="text-3xl font-black text-[#111111] font-serif uppercase tracking-tight">
            {categoryName}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Curated dispatches, updates, and deep dives in {categoryName}
          </p>
        </div>

        {/* Subcategories Pills if available */}
        {found?.subcategories && found.subcategories.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pb-2">
            {found.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/category/${slug}/${sub.slug}`}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-[#FFF0F2] hover:text-[#C7102E] rounded-full transition font-medium"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {posts.map((post) => (
            <article key={post.id} className="border border-gray-200 rounded-sm overflow-hidden flex flex-col group">
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
                  <span className="text-[11px] font-bold text-[#C7102E] uppercase tracking-wider block">
                    {post.category?.name || categoryName}
                  </span>
                  <Link href={`/article/${post.slug}`}>
                    <h3 className="font-bold text-base text-[#111111] group-hover:text-[#C7102E] transition line-clamp-2 mt-1">
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
                  Read Dispatch →
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
