"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [tags, setTags] = useState("");
  const [isHero, setIsHero] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState("PUBLISHED");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { id: 1, name: "Tech & Innovation" },
    { id: 2, name: "Travel Guide" },
    { id: 3, name: "Learning Portal" },
    { id: 4, name: "Personal Blog" },
    { id: 5, name: "Business & Markets" },
    { id: 6, name: "World & India" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please provide both a headline and article content.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          featuredImage,
          categoryId,
          tags,
          isHero,
          isTrending,
          isLive,
          status,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create article");
      }

      router.push(`/article/${data.slug}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Console</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded font-mono">
            Status: {status}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-gray-900 font-serif">
          Create & Publish New Dispatch
        </h1>
        <p className="text-xs text-gray-500">
          This article will be instantly formatted to fit the EveryGyan editorial grid.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-6 rounded-lg shadow-xs">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
            Article Headline *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next-Gen Web Architecture: Scaling on Hostinger with Next.js & MySQL"
            className="w-full text-lg font-bold px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
            Excerpt / Teaser Summary
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="A compelling 1-2 sentence lead paragraph shown on the front page card."
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
          />
        </div>

        {/* Category & Placement Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E] bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tech News, AI, FullStack, Travel"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            />
          </div>
        </div>

        {/* Grid Placement Slots */}
        <div className="bg-[#FBFBFC] border border-[#E5E5EB] p-4 rounded-md space-y-3">
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wide block">
            Homepage Grid Slot Placement
          </span>
          <div className="flex flex-wrap gap-6 text-xs text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isHero}
                onChange={(e) => {
                  setIsHero(e.target.checked);
                  if (e.target.checked) setIsTrending(false);
                }}
                className="rounded text-[#C7102E] focus:ring-[#C7102E]"
              />
              <span className="font-semibold text-gray-900">Featured Hero (Center Main Story)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => {
                  setIsTrending(e.target.checked);
                  if (e.target.checked) setIsHero(false);
                }}
                className="rounded text-[#C7102E] focus:ring-[#C7102E]"
              />
              <span className="font-semibold text-gray-900">Trending Feed (Left Column)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                className="rounded text-[#C7102E] focus:ring-[#C7102E]"
              />
              <span className="font-semibold text-red-600">● Tag as Live Breaking Story</span>
            </label>
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
            Featured Image URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            />
          </div>
          {featuredImage && (
            <div className="mt-3 relative w-full h-44 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={featuredImage}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
            Article Content (Supports HTML / Rich Text) *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="<p>Write your detailed article body here...</p><h2>Subheading</h2><p>Additional paragraphs and commentary...</p>"
            className="w-full text-xs font-mono px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            required
          />
        </div>

        {/* Publishing Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-gray-300 rounded bg-white"
            >
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white px-6 py-2.5 rounded text-xs font-bold transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Publishing Dispatch..." : "Publish Article Now"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
