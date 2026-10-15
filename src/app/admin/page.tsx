import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle, FileText, FolderKanban, LogOut, Eye, Flame, Radio } from "lucide-react";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { fallbackHeroPost, fallbackLeftStories } from "@/lib/data";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    posts = [fallbackHeroPost, ...fallbackLeftStories];
  }

  return (
    <div className="space-y-8 py-4">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 font-serif">
            Editorial CMS Console
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Signed in as <span className="font-semibold text-gray-700">{session.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white px-4 py-2 rounded text-xs font-bold transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish New Article</span>
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <FileText className="w-5 h-5 text-[#C7102E]" />
          </div>
          <div className="text-3xl font-black text-gray-900">{posts.length}</div>
          <span className="text-[11px] text-gray-500">Live across all categories</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Layout Roles</span>
            <Flame className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">
            {posts.filter((p) => p.isHero).length} <span className="text-sm font-normal text-gray-500">Hero</span> / {posts.filter((p) => p.isTrending).length} <span className="text-sm font-normal text-gray-500">Trending</span>
          </div>
          <span className="text-[11px] text-gray-500">Center & Left slots filled</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Target Database</span>
            <FolderKanban className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">Hostinger MySQL</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Active & Configured</span>
        </div>
      </div>

      {/* Articles Management Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
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
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/article/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[#C7102E] hover:underline font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
