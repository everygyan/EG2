"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, FolderKanban, Check, Sparkles } from "lucide-react";
import { CategoryItem } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (e) {
      console.error("Failed to load categories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatName.trim(),
          parentId: selectedParentId ? Number(selectedParentId) : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");

      setSuccessMsg(`Category "${newCatName}" added successfully!`);
      setNewCatName("");
      setSelectedParentId("");
      await loadCategories();
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
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
        <span className="text-xs text-gray-500 font-mono">
          {categories.length} Primary Sections
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-gray-900 font-serif">
          Category & Portal Management
        </h1>
        <p className="text-xs text-gray-500">
          Add new portals and dropdown subsections dynamically to your EveryGyan navbar without touching code.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add Category Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-[#C7102E]" />
          <span>Create New Section / Portal</span>
        </h3>

        <form onSubmit={handleCreateCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. AI Prompting or Visa Guides"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
              required
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Parent Portal (Optional)
            </label>
            <select
              value={selectedParentId}
              onChange={(e) => setSelectedParentId(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E] bg-white"
            >
              <option value="">-- Main Navigation Tab (Top Level) --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-bold rounded transition flex items-center justify-center gap-1.5 disabled:opacity-50 h-[34px]"
          >
            <span>{submitting ? "Adding..." : "Add to Navigation"}</span>
          </button>
        </form>
      </div>

      {/* Categories Tree View */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-gray-600" />
            <span>Active Navigation Tree & Dropdowns</span>
          </h2>
          <span className="text-xs text-gray-500">{categories.length} Sections</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading categories...</div>
        ) : (
          <div className="p-5 divide-y divide-gray-100 space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C7102E]"></span>
                    <span className="font-bold text-sm text-gray-900">{cat.name}</span>
                    <span className="text-[10px] font-mono text-gray-400">/category/{cat.slug}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {cat.subcategories?.length || 0} sub-portals
                  </span>
                </div>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="pl-6 flex flex-wrap gap-2 pt-1">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub.id}
                        className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded border border-gray-200 flex items-center gap-1.5"
                      >
                        <span>{sub.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ({sub.slug})
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
