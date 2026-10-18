import Link from "next/link";
import {
  Cpu,
  BookOpen,
  Compass,
  HeartPulse,
  TrendingUp,
  Trophy,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { UNIFIED_PILLARS, KnowledgePillar } from "@/lib/constants/navigation";

const iconMap = {
  Cpu: Cpu,
  BookOpen: BookOpen,
  Compass: Compass,
  HeartPulse: HeartPulse,
  TrendingUp: TrendingUp,
  Trophy: Trophy,
  Video: Sparkles,
  Sparkles: Sparkles,
};

export default function KnowledgePillars() {
  return (
    <section className="w-full pt-12 pb-6 border-t border-[#E2E2E6] mt-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C7102E] mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>KNOWLEDGE PILLARS &bull; EXPLORE BY CHANNEL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] font-serif tracking-tight">
            Curated Knowledge Desks
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl leading-relaxed">
            EveryGyan is organized around six core knowledge pillars. Explore deep-dive tutorials, cultural diaries, personal essays, and market briefings.
          </p>
        </div>

        <Link
          href="/category/tech"
          className="text-xs font-bold text-[#C7102E] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Browse All Portals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Knowledge Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UNIFIED_PILLARS.map((pillar: KnowledgePillar) => {
          const IconComponent = iconMap[pillar.iconName] || Layers;

          return (
            <div
              key={pillar.id}
              className="bg-white border border-[#E5E5EB] rounded-xl p-6 flex flex-col justify-between hover:border-[#C7102E] hover:shadow-md transition-all duration-200 group"
            >
              <div className="space-y-3.5">
                
                {/* Header: Icon & Pillar Name */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${pillar.accentColor}15`, color: pillar.accentColor }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#888888] bg-gray-100 px-2 py-0.5 rounded-full">
                    Desk
                  </span>
                </div>

                <div>
                  <Link href={pillar.href}>
                    <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#C7102E] transition-colors leading-snug">
                      {pillar.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-semibold text-[#888888] mt-0.5">
                    {pillar.tagline}
                  </p>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                  {pillar.description}
                </p>

                {/* Subcategory Pills */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
                    Featured Topics:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {pillar.subcategories.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.slug}
                        href={sub.href}
                        className="text-[11px] px-2 py-0.5 bg-gray-50 hover:bg-[#FFF0F2] text-gray-700 hover:text-[#C7102E] rounded border border-gray-200 hover:border-red-200 transition font-medium"
                      >
                        {sub.name}
                      </Link>
                    ))}
                    {pillar.subcategories.length > 4 && (
                      <Link
                        href={pillar.href}
                        className="text-[10px] px-1.5 py-0.5 text-gray-400 hover:text-[#C7102E] transition font-semibold"
                      >
                        +{pillar.subcategories.length - 4} more
                      </Link>
                    )}
                  </div>
                </div>

              </div>

              {/* Card Footer Link */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={pillar.href}
                  className="text-xs font-bold text-[#111111] group-hover:text-[#C7102E] flex items-center gap-1 transition"
                >
                  <span>Explore {pillar.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] text-gray-400">
                  {pillar.subcategories.length} Sections
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
