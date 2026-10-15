"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Radio, CheckCircle, AlertCircle } from "lucide-react";

interface AdminArticleTableProps {
  initialPosts: any[];
}

export default function AdminArticleTable({ initialPosts }: AdminArticleTableProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(`Error deleting article: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
      <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800">Published Dispatches & Articles</h2>
        <span className="text-xs text-gray-500">{posts.length} articles</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-100/80 uppercase text-[10px] text-gray-500 font-bold border-b border-gray-200">
            <tr>
              <th className="px-5 py-3">Headline</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Layout Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3.5 font-bold text-gray-900 max-w-md truncate">
                  {post.title}
                </td>
                <td className="px-5 py-3.5 text-gray-600">
                  <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[11px] font-medium">
                    {post.category?.name || "General"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  {post.isHero && (
                    <span className="bg-red-100 text-[#C7102E] px-2 py-0.5 rounded font-bold text-[10px]">
                      ★ HERO (Center)
                    </span>
                  )}
                  {post.isTrending && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">
                      TRENDING (Left)
                    </span>
                  )}
                  {post.isLive && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1 w-fit">
                      <Radio className="w-2.5 h-2.5 animate-pulse" />
                      LIVE
                    </span>
                  )}
                  {!post.isHero && !post.isTrending && !post.isLive && (
                    <span className="text-gray-400 text-[11px]">Standard</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                  <span className="text-gray-700 font-medium">{post.status || "PUBLISHED"}</span>
                </td>
                <td className="px-5 py-3.5 text-right flex items-center justify-end gap-3">
                  <Link
                    href={`/article/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[#C7102E] hover:underline font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletingId === post.id}
                    className="text-gray-400 hover:text-rose-600 transition p-1"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
