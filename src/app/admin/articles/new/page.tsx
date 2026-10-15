"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Sparkles, Upload, Search, Globe } from "lucide-react";
import RichArticleEditor from "@/components/admin/RichArticleEditor";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isHero, setIsHero] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState("PUBLISHED");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        if (d.categories) setCategories(d.categories);
      })
      .catch(() => {});
  }, []);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFeaturedImage(data.url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

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
          excerpt: excerpt || title.slice(0, 150),
          content,
          featuredImage,
          categoryId,
          tags,
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt,
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

  // Google SERP preview data
  const seoPreviewTitle = metaTitle || title || "Article Headline — EveryGyan";
  const seoPreviewDesc =
    metaDescription ||
    excerpt ||
    "Read comprehensive editorial journalism, travel guides, and engineering tutorials on EveryGyan.";

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
          <Link
            href="/admin/categories"
            className="text-xs text-[#C7102E] hover:underline font-semibold"
          >
            Manage Categories →
          </Link>
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

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-6 rounded-lg shadow-2xs">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
            Article Headline *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Municipal enforcement drive: Authorities clear illegal structures in Punjab"
            className="w-full text-lg font-bold px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
            Excerpt / Lead Paragraph
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="A compelling 1-2 sentence lead summary shown on front page editorial cards."
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
          />
        </div>

        {/* Featured Image URL or Direct File Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            Featured Hero Image
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/... or upload below"
              className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            />
            <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition shrink-0">
              <Upload className="w-3.5 h-3.5 text-[#C7102E]" />
              <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {featuredImage && (
            <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100 border border-gray-200 mt-2">
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

        {/* Category & Placement Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Category / Portal
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
              placeholder="Tech News, Punjab, Enforcement, Governance"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
            />
          </div>
        </div>

        {/* Homepage Grid Placement Selection */}
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

        {/* Rich WYSIWYG & Markdown Content Editor */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            Article Content (Rich Formatted Editor) *
          </label>
          <RichArticleEditor
            content={content}
            onChange={setContent}
            onImageUploaded={(url) => {
              if (!featuredImage) setFeaturedImage(url);
            }}
          />
        </div>

        {/* SEO Meta Box & Live Google Search Snippet Preview */}
        <div className="border border-gray-200 rounded-lg p-5 bg-[#FAFAFC] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
            <Globe className="w-4 h-4 text-[#C7102E]" />
            <span>SEO & Social Share Preview (Google SERP)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Custom Meta Title ({metaTitle.length}/60 chars)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || "SEO optimized headline"}
                className="w-full text-xs px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E] bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Meta Description ({metaDescription.length}/160 chars)
              </label>
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || "Search engine summary..."}
                className="w-full text-xs px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E] bg-white"
              />
            </div>
          </div>

          {/* Google Preview Widget */}
          <div className="bg-white p-3.5 border border-gray-200 rounded text-xs space-y-1 shadow-2xs">
            <div className="text-[11px] text-gray-500 font-mono">
              https://everygyan.com &rsaquo; article &rsaquo; ...
            </div>
            <div className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate">
              {seoPreviewTitle}
            </div>
            <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
              {seoPreviewDesc}
            </div>
          </div>
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
