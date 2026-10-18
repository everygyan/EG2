"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, Radio, Sparkles, Layers } from "lucide-react";
import { TOP_NAV_ITEMS, UNIFIED_PILLARS } from "@/lib/constants/navigation";
import { CategoryItem } from "@/types";

interface NavbarProps {
  categories?: CategoryItem[];
}

export default function Navbar({ categories }: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

                  {/* Mega-menu / Dropdown Menu */}
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

          {/* Action Icons (Search & Menu) */}
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
              aria-label="Navigation Menu"
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

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[110px] bottom-0 bg-white z-40 overflow-y-auto p-6 border-t border-[#E2E2E6] shadow-2xl">
            <div className="max-w-[800px] mx-auto space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E2E6]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C7102E]" />
                  <h3 className="font-bold text-lg font-serif">Knowledge Desks & Channels</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/profile"
                    className="text-xs border border-gray-300 text-gray-700 px-2.5 py-1.5 rounded hover:bg-gray-100 font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/admin"
                    className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-black font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin CMS →
                  </Link>
                </div>
              </div>

              {/* Unified Knowledge Pillars in Mobile View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {UNIFIED_PILLARS.map((pillar) => (
                  <div key={pillar.id} className="space-y-2">
                    <Link
                      href={pillar.href}
                      className="font-bold text-sm text-[#111111] hover:text-[#C7102E] block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {pillar.name}
                    </Link>
                    {pillar.subcategories && pillar.subcategories.length > 0 && (
                      <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                        {pillar.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={sub.href}
                              className="text-xs text-gray-600 hover:text-[#C7102E] block"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
