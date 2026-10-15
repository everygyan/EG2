import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle, FileText, FolderKanban, LogOut, Flame, DollarSign } from "lucide-react";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { fallbackHeroPost, fallbackLeftStories } from "@/lib/data";
import AdminArticleTable from "@/components/admin/AdminArticleTable";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let posts: any[] = [];
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      posts = await prisma.post.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
    } catch {}
  }

  if (posts.length === 0) {
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

        <div className="flex items-center flex-wrap gap-2.5">
          <Link
            href="/admin/categories"
            className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-xs font-semibold transition"
          >
            <FolderKanban className="w-3.5 h-3.5 text-blue-600" />
            <span>Category Manager</span>
          </Link>

          <Link
            href="/admin/ads"
            className="flex items-center gap-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-xs font-semibold transition"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Monetization & Ads</span>
          </Link>

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
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <FileText className="w-5 h-5 text-[#C7102E]" />
          </div>
          <div className="text-3xl font-black text-gray-900">{posts.length}</div>
          <span className="text-[11px] text-gray-500">Live across all categories</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Layout Roles</span>
            <Flame className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">
            {posts.filter((p) => p.isHero).length} <span className="text-sm font-normal text-gray-500">Hero</span> / {posts.filter((p) => p.isTrending).length} <span className="text-sm font-normal text-gray-500">Trending</span>
          </div>
          <span className="text-[11px] text-gray-500">Center & Left slots filled</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Target Database</span>
            <FolderKanban className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">Hostinger MySQL</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Active & Configured</span>
        </div>
      </div>

      {/* Articles Management Table Component */}
      <AdminArticleTable initialPosts={posts} />

    </div>
  );
}
