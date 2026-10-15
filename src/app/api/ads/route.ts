import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const defaultAdSlots = [
  {
    slotKey: "HEADER_LEADERBOARD",
    title: "Header Leaderboard (728x90)",
    placement: "HEADER",
    isActive: true,
    adCode: "",
    targetUrl: "/plans",
  },
  {
    slotKey: "SIDEBAR_RECTANGLE",
    title: "Sidebar Medium Rectangle (300x250)",
    placement: "SIDEBAR_TOP",
    isActive: true,
    adCode: "",
    targetUrl: "/masterclass",
  },
  {
    slotKey: "IN_ARTICLE",
    title: "In-Article Injected Banner",
    placement: "ARTICLE_BODY",
    isActive: true,
    adCode: "",
    targetUrl: "/learning",
  },
];

export async function GET() {
  if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    try {
      const slots = await prisma.adSlot.findMany();
      if (slots && slots.length > 0) {
        return NextResponse.json({ slots });
      }
    } catch {}
  }
  return NextResponse.json({ slots: defaultAdSlots });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  try {
    const { slotKey, title, isActive, adCode, targetUrl } = await req.json();

    let updatedSlot: any = { slotKey, title, isActive, adCode, targetUrl };

    if (!process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
      try {
        updatedSlot = await prisma.adSlot.upsert({
          where: { slotKey },
          update: { title, isActive, adCode, targetUrl },
          create: { slotKey, title, isActive, adCode, targetUrl },
        });
      } catch (e) {
        console.warn("DB ad slot write fallback:", e);
      }
    }

    return NextResponse.json({ success: true, slot: updatedSlot });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update ad slot" }, { status: 500 });
  }
}
