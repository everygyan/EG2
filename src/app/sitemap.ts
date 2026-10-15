import { MetadataRoute } from "next";
import { fallbackCategories, fallbackHeroPost, fallbackLeftStories, fallbackSubHeroPost } from "@/lib/data";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://everygyan.com";

  // Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/feed/plus`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/masterclass`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plans`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Category Routes
  const categoryRoutes: MetadataRoute.Sitemap = fallbackCategories.flatMap((cat) => {
    const parentRoute = {
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    };

    const subRoutes = (cat.subcategories || []).map((sub) => ({
      url: `${baseUrl}/category/${cat.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    return [parentRoute, ...subRoutes];
  });

  // Article Routes
  let articles: any[] = [];
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      articles = await prisma.post.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      });
    } catch {}
  }

  if (articles.length === 0) {
    articles = [fallbackHeroPost, fallbackSubHeroPost, ...fallbackLeftStories];
  }

  const articleRoutes: MetadataRoute.Sitemap = articles.map((post) => ({
    url: `${baseUrl}/article/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
