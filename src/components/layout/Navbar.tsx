"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Radio } from "lucide-react";
import { CategoryItem } from "@/types";

interface NavbarProps {
  categories: CategoryItem[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Default nav items as requested + from the screenshot
  const navTabs = [
    { label: "EveryGyan +", href: "/feed/plus", isSpecial: true },
    { label: "Travel Guide", href: "/category/travel", catSlug: "travel" },
    { label: "Learning Portal", href: "/category/learning", catSlug: "learning" },
    { label: "Personal Blog", href: "/category/personal-blog", catSlug: "personal-blog" },
    { label: "Tech", href: "/category/tech", catSlug: "tech" },
    { label: "Business", href: "/category/business", catSlug: "business" },
    { label: "Videos", href: "/category/videos" },
    { label: "City", href: "/category/city" },
    { label: "India", href: "/category/india" },
    { label: "World", href: "/category/world" },
    { label: "Cricket", href: "/category/cricket" },
    { label: "Entertainment", href: "/category/entertainment" },
    { label: "Live", href: "/live", isLive: true },
  ];

  // Helper to find category subcategories
  const getSubcategories = (catSlug?: string) => {
    if (!catSlug) return [];
    const found = categories.find((c) => c.slug === catSlug);
    return found?.subcategories || [];
  };

  return (
    <nav className="relative border-b border-[#E2E2E6] bg-white text-[13px] font-medium z-30">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Main Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2.5">
            {navTabs.map((item, idx) => {
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
                    <span className="w-2 h-2 rounded-full bg-[#C7102E] animate-pulse"></span>
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
                    className="whitespace-nowrap flex items-center gap-1 px-2.5 py-1 text-[#222222] hover:text-[#C7102E] transition"
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-[#888888] group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === idx && (
                    <div className="absolute left-0 top-full pt-1 w-52 shadow-xl bg-white border border-[#E2E2E6] rounded-sm py-2 z-50">
                      <div className="px-3 py-1 text-[11px] font-bold uppercase text-[#888888] border-b border-[#F0F0F2] mb-1">
                        Explore {item.label}
                      </div>
                      {subs.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${item.catSlug}/${sub.slug}`}
                          className="block px-3 py-1.5 text-xs text-[#333333] hover:bg-[#FFF5F6] hover:text-[#C7102E] transition font-normal"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Icons (Search & Menu) */}
          <div className="flex items-center space-x-2 pl-3 border-l border-[#E2E2E6] my-2">
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
          <div className="py-2.5 border-t border-[#F0F0F2] flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search EveryGyan articles, travel guides, tech reviews..."
              className="w-full text-sm px-3 py-1.5 border border-[#CCCCCC] rounded-sm focus:outline-none focus:border-[#C7102E]"
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="px-4 py-1.5 bg-[#C7102E] text-white text-xs font-semibold rounded-sm hover:bg-[#9E0C24] transition"
            >
              Search
            </button>
          </div>
        )}

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[112px] bottom-0 bg-white z-40 overflow-y-auto p-6 border-t border-[#E2E2E6] shadow-2xl">
            <div className="max-w-[800px] mx-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E2E6]">
                <h3 className="font-bold text-lg font-serif">All Sections & Portals</h3>
                <Link
                  href="/admin"
                  className="text-xs bg-gray-900 text-white px-3 py-1 rounded hover:bg-black font-semibold"
                >
                  Admin CMS Portal →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <Link
                      href={`/category/${cat.slug}`}
                      className="font-bold text-sm text-[#111111] hover:text-[#C7102E] block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <ul className="space-y-1.5 pl-2 border-l border-gray-200">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/category/${cat.slug}/${sub.slug}`}
                              className="text-xs text-gray-600 hover:text-[#C7102E]"
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
