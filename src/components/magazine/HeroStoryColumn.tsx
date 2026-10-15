import Link from "next/link";
import Image from "next/image";
import { Radio } from "lucide-react";
import { PostItem } from "@/types";

interface HeroStoryColumnProps {
  hero: PostItem;
  subHero?: PostItem;
}

export default function HeroStoryColumn({ hero, subHero }: HeroStoryColumnProps) {
  if (!hero) return null;

  return (
    <main className="flex-1 min-w-0 px-0 lg:px-5 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#E2E2E6]">
      
      {/* Primary Hero Article */}
      <article className="space-y-4 pb-6 border-b border-[#E2E2E6]">
        <Link href={`/article/${hero.slug}`} className="group block space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#111111] leading-[1.2] tracking-tight group-hover:text-[#C7102E] transition-colors">
            {hero.title}
          </h1>

          {hero.featuredImage && (
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
              <Image
                src={hero.featuredImage}
                alt={hero.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>
          )}

          {hero.excerpt && (
            <p className="text-sm text-[#444444] leading-relaxed pt-1">
              {hero.excerpt}
            </p>
          )}
        </Link>
      </article>

      {/* Sub-Hero / Live Story Row */}
      {subHero && (
        <article className="pt-5">
          <Link
            href={`/article/${subHero.slug}`}
            className="group flex flex-col-reverse sm:flex-row items-start justify-between gap-4"
          >
            <div className="flex-1 space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-[#111111] leading-snug group-hover:text-[#C7102E] transition-colors">
                {subHero.title}
              </h2>
              {subHero.excerpt && (
                <p className="text-xs text-[#555555] line-clamp-2">
                  {subHero.excerpt}
                </p>
              )}
            </div>

            {subHero.featuredImage && (
              <div className="relative w-full sm:w-[130px] h-[80px] shrink-0 rounded overflow-hidden bg-gray-100">
                <Image
                  src={subHero.featuredImage}
                  alt={subHero.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="130px"
                />
                {subHero.isLive && (
                  <span className="absolute top-1.5 right-1.5 bg-[#C7102E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    <span>Live</span>
                  </span>
                )}
              </div>
            )}
          </Link>
        </article>
      )}

    </main>
  );
}
