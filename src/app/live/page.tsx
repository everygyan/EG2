import Link from "next/link";
import Image from "next/image";
import { Radio, Clock, ArrowLeft, Share2, Flame } from "lucide-react";
import prisma from "@/lib/prisma";
import RightSidebar from "@/components/magazine/RightSidebar";
import { fallbackSubHeroPost, fallbackHeroPost } from "@/lib/data";

export default async function LivePage() {
  let livePosts: any[] = [];
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      livePosts = await prisma.post.findMany({
        where: {
          OR: [{ isLive: true }, { isHero: true }],
          status: "PUBLISHED",
        },
        include: { category: true, tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      // fallback below
    }
  }

  if (livePosts.length === 0) {
    livePosts = [fallbackSubHeroPost, fallbackHeroPost];
  }

  const liveTimeline = [
    {
      time: "22:15 CET",
      headline: "Youth delegation approaches Jantar Mantar amid peaceful coordination",
      body: "Security forces have established perimeter checkpoints while student leaders reiterate their charter of demands.",
    },
    {
      time: "21:40 CET",
      headline: "Punjab Civic Authorities confirm 95% containment of industrial perimeter",
      body: "Fire marshals and hazardous material response units remain on standby to prevent secondary flare-ups.",
    },
    {
      time: "20:50 CET",
      headline: "Special joint monitoring task force formed for urban encroachments",
      body: "Administrative representatives from municipal divisions scheduled a midnight briefing with state commissioners.",
    },
  ];

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

        {/* Live Masthead */}
        <div className="bg-[#111111] text-white p-6 rounded-lg space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-[#C7102E] text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE BROADCAST</span>
            </span>
            <span className="text-xs text-gray-400">Updated every 60 seconds</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-white">
            Breaking News & Real-Time Dispatches
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            Continuous coverage from EveryGyan correspondents on civic developments, policy changes, and emerging field reports.
          </p>
        </div>

        {/* Live Stories Feed */}
        <div className="space-y-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
            <Flame className="w-4 h-4 text-[#C7102E]" />
            <span>Featured Live Reports</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {livePosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-xs group"
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
                    <span className="absolute top-2 left-2 bg-[#C7102E] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                      <Radio className="w-2.5 h-2.5 animate-ping" />
                      LIVE
                    </span>
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#C7102E] uppercase tracking-wider block">
                    {post.category?.name || "Live Wire"}
                  </span>
                  <Link href={`/article/${post.slug}`}>
                    <h3 className="font-bold text-sm text-[#111111] group-hover:text-[#C7102E] transition line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Real-time Timeline */}
          <div className="pt-4 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span>Chronological Wire Feed</span>
            </h2>

            <div className="relative pl-6 space-y-6 border-l-2 border-[#C7102E]/40 ml-2">
              {liveTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#C7102E] border-2 border-white"></span>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#C7102E]">
                      {item.time}
                    </span>
                    <h4 className="text-sm font-bold text-[#111111] leading-snug">
                      {item.headline}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <RightSidebar />
    </div>
  );
}
