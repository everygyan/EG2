"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Radio,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  Compass,
  HeartPulse,
  TrendingUp,
  Trophy,
  Video,
  User,
  Shield,
  ArrowRight,
} from "lucide-react";
import { TOP_NAV_ITEMS, UNIFIED_PILLARS, KnowledgePillar } from "@/lib/constants/navigation";
import { CategoryItem } from "@/types";

interface NavbarProps {
  categories?: CategoryItem[];
}

const pillarIconMap: Record<string, any> = {
  Cpu,
  BookOpen,
  Compass,
  HeartPulse,
  TrendingUp,
  Trophy,
  Video,
  Sparkles,
};

export default function Navbar({ categories }: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("tech-learning");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock background body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const toggleAccordion = (id: string) => {
    setExpandedAccordion((prev) => (prev === id ? null : id));
  };

  // Get subcategories from the unified navigation configuration (and fallback to DB categories if present)
  const getSubcategories = (catSlug?: string) => {
    if (!catSlug) return [];

    // First check unified navigation configuration
    const pillar = UNIFIED_PILLARS.find((p) => p.slug === catSlug);
    if (pillar && pillar.subcategories.length > 0) {
      return pillar.subcategories;
    }

    // Check DB categories if passed
    if (categories && categories.length > 0) {
      const dbCat = categories.find((c) => c.slug === catSlug);
      if (dbCat?.subcategories && dbCat.subcategories.length > 0) {
        return dbCat.subcategories.map((s) => ({
          name: s.name,
          slug: s.slug,
          href: `/category/${catSlug}/${s.slug}`,
        }));
      }
    }

    // Check if videos tab
    if (catSlug === "videos") {
      return [
        { name: "Documentaries", slug: "documentaries", href: "/category/videos/documentaries" },
        { name: "Tech Teardowns", slug: "tech-teardowns", href: "/category/videos/tech-teardowns" },
        { name: "Travel Vlogs", slug: "travel-vlogs", href: "/category/videos/travel-vlogs" },
      ];
    }

    return [];
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2E2E6] text-[13px] font-medium shadow-2xs">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Main Navigation Horizontal Scroll List */}
          <div className="flex items-center space-x-0.5 sm:space-x-1.5 overflow-x-auto no-scrollbar py-2">
            {TOP_NAV_ITEMS.map((item, idx) => {
              const subs = getSubcategories(item.catSlug);
              const hasDropdown = subs.length > 0;

              if (item.isSpecial) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="whitespace-nowrap px-3 py-1 font-bold text-[#C7102E] border-b-2 border-[#C7102E] hover:opacity-90 transition"
                  >
                    {item.label}
                  </Link>
                );
              }

              if (item.isLive) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 text-black font-semibold hover:text-[#C7102E] transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#C7102E] animate-ping"></span>
                    <Radio className="w-3.5 h-3.5 text-[#C7102E]" />
                    <span>Live</span>
                  </Link>
                );
              }

              return (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(idx)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 text-[#222222] hover:text-[#C7102E] transition rounded hover:bg-gray-50 font-semibold"
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-[#888888] group-hover:text-[#C7102E] group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Desktop Mega-menu / Dropdown Menu */}
                  {hasDropdown && activeDropdown === idx && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 shadow-2xl bg-white border border-[#E2E2E6] rounded-md py-2 z-50 animate-in fade-in duration-150">
                      <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#888888] border-b border-[#F0F0F2] mb-1 flex items-center justify-between">
                        <span>{item.label} Desks</span>
                        <Sparkles className="w-3 h-3 text-[#C7102E]" />
                      </div>
                      
                      {subs.map((sub: any) => (
                        <Link
                          key={sub.slug}
                          href={sub.href || `/category/${item.catSlug}/${sub.slug}`}
                          className="block px-3.5 py-1.5 text-xs text-[#333333] hover:bg-[#FFF5F6] hover:text-[#C7102E] transition font-normal"
                        >
                          <div className="font-semibold">{sub.name}</div>
                          {sub.description && (
                            <div className="text-[10px] text-gray-400 line-clamp-1">
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      ))}

                      <div className="mt-1 pt-1 border-t border-[#F0F0F2] px-3.5 py-1">
                        <Link
                          href={item.href}
                          className="text-[11px] font-bold text-[#C7102E] hover:underline block"
                        >
                          View all in {item.label} →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Icons (Search & Mobile Menu Toggle) */}
          <div className="flex items-center space-x-1.5 pl-3 border-l border-[#E2E2E6] my-2 shrink-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="p-1.5 text-[#333333] hover:text-[#C7102E] transition rounded-full hover:bg-gray-100"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="p-1.5 text-[#333333] hover:text-[#C7102E] transition rounded-full hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Search Bar Input Reveal */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="py-2.5 border-t border-[#F0F0F2] flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search EveryGyan articles, tutorials, travel diaries, health dispatches..."
                className="w-full text-xs pl-9 pr-3 py-2 border border-[#CCCCCC] rounded focus:outline-none focus:border-[#C7102E]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-semibold rounded transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2 text-gray-500 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mobile Navigation Drawer with Accordion Toggles & Body Scroll Lock */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-0 top-[53px] z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileMenuOpen(false);
            }}
          >
            <div
              className="w-full max-w-md h-full bg-white flex flex-col shadow-2xl border-l border-[#E2E2E6] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#E2E2E6] flex items-center justify-between bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C7102E]" />
                  <span className="font-bold text-sm font-serif text-[#111111]">
                    Knowledge Desks &amp; Channels
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-200/60 transition"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Search Bar */}
              <div className="p-3 border-b border-gray-100 bg-white">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics, keywords..."
                    className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-[#C7102E] bg-gray-50"
                  />
                </form>
              </div>

              {/* Drawer Scrollable Accordion Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 overscroll-contain">
                
                {/* Special Highlight: EveryGyan+ & Live */}
                <div className="grid grid-cols-2 gap-2 pb-2">
                  <Link
                    href="/feed/plus"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-gray-900 to-[#1e1e24] text-white rounded-lg text-xs font-bold hover:opacity-90 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C7102E]" />
                    <span>EveryGyan +</span>
                  </Link>
                  <Link
                    href="/live"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-[#C7102E] border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                  >
                    <Radio className="w-3.5 h-3.5 text-[#C7102E] animate-pulse" />
                    <span>Live Wire</span>
                  </Link>
                </div>

                {/* Core Knowledge Pillars Accordion */}
                <div className="space-y-2">
                  {UNIFIED_PILLARS.map((pillar: KnowledgePillar) => {
                    const isExpanded = expandedAccordion === pillar.id;
                    const IconComponent = pillarIconMap[pillar.iconName] || Layers;

                    return (
                      <div
                        key={pillar.id}
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs"
                      >
                        {/* Accordion Trigger Button */}
                        <button
                          type="button"
                          id={`mobile-btn-${pillar.id}`}
                          onClick={() => toggleAccordion(pillar.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-panel-${pillar.id}`}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 text-left bg-gray-50/70 hover:bg-gray-100/80 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `${pillar.accentColor}15`,
                                color: pillar.accentColor,
                              }}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <div className="truncate">
                              <span className="font-bold text-xs text-[#111111] block">
                                {pillar.name}
                              </span>
                              <span className="text-[10px] text-gray-500 line-clamp-1">
                                {pillar.tagline}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                              {pillar.subcategories.length}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-[#C7102E]" : ""
                              }`}
                            />
                          </div>
                        </button>

                        {/* Collapsible Accordion Panel */}
                        <div
                          id={`mobile-panel-${pillar.id}`}
                          role="region"
                          aria-labelledby={`mobile-btn-${pillar.id}`}
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="p-3 bg-white border-t border-gray-100 space-y-1 text-xs">
                            <Link
                              href={pillar.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-[11px] font-bold text-[#C7102E] hover:underline flex items-center justify-between py-1 px-2 bg-red-50/40 rounded"
                            >
                              <span>Explore all in {pillar.shortName}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            <div className="pt-1 space-y-0.5">
                              {pillar.subcategories.map((sub) => (
                                <Link
                                  key={sub.slug}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1.5 px-2 rounded text-gray-700 hover:text-[#C7102E] hover:bg-gray-50 transition"
                                >
                                  <div className="font-semibold text-xs">{sub.name}</div>
                                  {sub.description && (
                                    <div className="text-[10px] text-gray-400 line-clamp-1">
                                      {sub.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Videos Channel Accordion */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      id="mobile-btn-videos"
                      onClick={() => toggleAccordion("videos")}
                      aria-expanded={expandedAccordion === "videos"}
                      aria-controls="mobile-panel-videos"
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-left bg-gray-50/70 hover:bg-gray-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-red-50 text-[#C7102E]">
                          <Video className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-xs text-[#111111] block">
                            Videos &amp; Visual Documentaries
                          </span>
                          <span className="text-[10px] text-gray-500 line-clamp-1">
                            Field footage, teardowns &amp; interviews
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                          3
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                            expandedAccordion === "videos" ? "rotate-180 text-[#C7102E]" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      id="mobile-panel-videos"
                      role="region"
                      aria-labelledby="mobile-btn-videos"
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedAccordion === "videos" ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-3 bg-white border-t border-gray-100 space-y-1 text-xs">
                        <Link
                          href="/category/videos"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[11px] font-bold text-[#C7102E] hover:underline flex items-center justify-between py-1 px-2 bg-red-50/40 rounded"
                        >
                          <span>View all Video Documentaries</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <div className="pt-1 space-y-0.5">
                          {[
                            { name: "Documentaries", href: "/category/videos/documentaries", desc: "Long-form journalism & field records" },
                            { name: "Tech Teardowns", href: "/category/videos/tech-teardowns", desc: "Silicon, frameworks & hardware" },
                            { name: "Travel Vlogs", href: "/category/videos/travel-vlogs", desc: "Expedition routes and diaries" },
                          ].map((v) => (
                            <Link
                              key={v.name}
                              href={v.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 px-2 rounded text-gray-700 hover:text-[#C7102E] hover:bg-gray-50 transition"
                            >
                              <div className="font-semibold text-xs">{v.name}</div>
                              <div className="text-[10px] text-gray-400">{v.desc}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-[#E2E2E6] bg-gray-50 flex items-center justify-between gap-3 shrink-0">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 bg-gray-900 text-white rounded-md hover:bg-black transition"
                >
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>Admin CMS</span>
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
