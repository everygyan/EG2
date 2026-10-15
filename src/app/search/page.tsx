import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import RightSidebar from "@/components/magazine/RightSidebar";
import { fallbackHeroPost, fallbackLeftStories, fallbackSubHeroPost } from "@/lib/data";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let results: any[] = [];

  if (query) {
    if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
      try {
        results = await prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: query } },
              { excerpt: { contains: query } },
              { content: { contains: query } },
            ],
            status: "PUBLISHED",
          },
          include: { category: true, tags: { include: { tag: true } } },
        });
      } catch (e) {
        console.warn("Search DB fallback:", e);
      }
    }

    if (results.length === 0) {
      // Fallback search across seed posts
      const allMock = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories];
      const lower = query.toLowerCase();
      results = allMock.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.excerpt.toLowerCase().includes(lower) ||
          p.category?.name.toLowerCase().includes(lower)
      );
    }
  }

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

        {/* Search Header */}
        <div className="border-b-2 border-[#C7102E] pb-4 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] font-serif">
            Search Dispatches
          </h1>
          <p className="text-xs text-gray-500">
            {query ? (
              <span>
                Showing results for &ldquo;<span className="font-bold text-[#111111]">{query}</span>&rdquo; ({results.length} found)
              </span>
            ) : (
              "Enter keywords to search across travel guides, tech dispatches, and learning tutorials."
            )}
          </p>
        </div>

        {/* Search Form */}
        <form action="/search" method="GET" className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by topic, keyword, or category..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-semibold rounded transition"
          >
            Search
          </button>
        </form>

        {/* Results List */}
        {results.length > 0 ? (
          <div className="space-y-4 pt-2">
            {results.map((post) => (
              <article
                key={post.id}
                className="p-4 border border-gray-200 rounded-sm hover:border-[#C7102E]/40 transition group flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div className="space-y-1.5 flex-1">
                  <span className="text-[11px] font-bold text-[#C7102E] uppercase tracking-wide">
                    {post.category?.name || "Editorial"}
                  </span>
                  <Link href={`/article/${post.slug}`}>
                    <h3 className="text-base font-bold text-[#111111] group-hover:text-[#C7102E] transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 pt-2 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>3 min read</span>
                    </span>
                    <Link
                      href={`/article/${post.slug}`}
                      className="text-[#C7102E] font-semibold hover:underline ml-auto"
                    >
                      Read Story →
                    </Link>
                  </div>
                </div>

                {post.featuredImage && (
                  <div className="relative w-full sm:w-[130px] h-[90px] shrink-0 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                      sizes="130px"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-md space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              No matching articles found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try searching for &quot;Tech&quot;, &quot;App&quot;, &quot;Punjab&quot;, &quot;Health&quot;, or &quot;Travel&quot;.
            </p>
          </div>
        ) : null}

      </div>

      <RightSidebar />
    </div>
  );
}
