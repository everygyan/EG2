import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { getAdminSession } from "@/lib/auth";
import { fallbackCategories } from "@/lib/data";

export async function GET() {
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      const cats = await prisma.category.findMany({
        where: { parentId: null },
        include: {
          subcategories: { orderBy: { order: "asc" } },
        },
        orderBy: { order: "asc" },
      });
      return NextResponse.json({ categories: cats });
    } catch (e) {
      console.warn("DB categories fetch fallback:", e);
    }
  }
  return NextResponse.json({ categories: fallbackCategories });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  try {
    const { name, parentId } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const baseSlug = slugify(name, { lower: true, strict: true });
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    let newCategory: any = { id: Date.now(), name, slug, parentId: parentId ? Number(parentId) : null };

    if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
      try {
        newCategory = await prisma.category.create({
          data: {
            name,
            slug,
            parentId: parentId ? Number(parentId) : null,
          },
        });
      } catch (err) {
        console.warn("Prisma category write fallback:", err);
      }
    }

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}
