import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const numId = Number(id);

  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: numId },
        include: { category: true, tags: { include: { tag: true } } },
      });
      if (post) return NextResponse.json({ post });
    } catch {}
  }

  return NextResponse.json({ error: "Post not found" }, { status: 404 });
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  const { id } = await params;
  const numId = Number(id);

  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      await prisma.post.delete({ where: { id: numId } });
      return NextResponse.json({ success: true, message: "Article deleted" });
    } catch (e: any) {
      return NextResponse.json({ error: e.message || "Failed to delete" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, message: "Article deleted (mock mode)" });
}

export async function PUT(req: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  const { id } = await params;
  const numId = Number(id);
  const body = await req.json();

  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      const updated = await prisma.post.update({
        where: { id: numId },
        data: {
          title: body.title,
          excerpt: body.excerpt,
          content: body.content,
          featuredImage: body.featuredImage,
          categoryId: Number(body.categoryId),
          isHero: Boolean(body.isHero),
          isTrending: Boolean(body.isTrending),
          isLive: Boolean(body.isLive),
          status: body.status,
          metaTitle: body.metaTitle,
          metaDescription: body.metaDescription,
        },
      });
      return NextResponse.json({ success: true, post: updated });
    } catch (e: any) {
      return NextResponse.json({ error: e.message || "Failed to update article" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, post: body });
}
