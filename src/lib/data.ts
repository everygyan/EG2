import prisma from "./prisma";
import { CategoryItem, InTheNewsItemData, PostItem } from "@/types";
import { UNIFIED_PILLARS } from "./constants/navigation";

// Unified categories derived from the single source of truth in navigation constants
export const fallbackCategories: CategoryItem[] = [
  ...UNIFIED_PILLARS.map((pillar, idx) => ({
    id: idx + 1,
    name: pillar.name,
    slug: pillar.slug,
    subcategories: pillar.subcategories.map((sub, subIdx) => ({
      id: (idx + 1) * 100 + (subIdx + 1),
      name: sub.name,
      slug: sub.slug,
    })),
  })),
  {
    id: 100,
    name: "Videos & Documentaries",
    slug: "videos",
    subcategories: [
      { id: 1001, name: "Documentaries", slug: "documentaries" },
      { id: 1002, name: "Tech Teardowns", slug: "tech-teardowns" },
      { id: 1003, name: "Travel Vlogs", slug: "travel-vlogs" },
    ],
  },
  {
    id: 200,
    name: "Learning Portal",
    slug: "learning",
    subcategories: [
      { id: 2001, name: "Coding Masterclass", slug: "coding" },
      { id: 2002, name: "FullStack Next.js & React", slug: "fullstack" },
      { id: 2003, name: "AI Engineering & Agents", slug: "ai-engineering" },
      { id: 2004, name: "Financial Literacy & Investing", slug: "finance" },
      { id: 2005, name: "Career & Leadership", slug: "career" },
    ],
  },
];

export const fallbackTickerItems: InTheNewsItemData[] = [
  { id: 1, title: "Tech & AI Frontier Summit 2026", linkUrl: "/category/tech/ai-deeptech", order: 1 },
  { id: 2, title: "Diaspora Dialogues By EveryGyan™", linkUrl: "/category/personal-blog", order: 2 },
  { id: 3, title: "Himalayan Expedition Routes Open", linkUrl: "/category/travel/asia", order: 3 },
  { id: 4, title: "Longevity & Metabolic Biomarkers Guide", linkUrl: "/category/health", order: 4 },
  { id: 5, title: "Next.js 15 Full-Stack Architecture", linkUrl: "/category/tech/fullstack", order: 5 },
  { id: 6, title: "Global Markets & Venture Capital Shifts", linkUrl: "/category/business/markets", order: 6 },
];

export const fallbackHeroPost: PostItem = {
  id: 1,
  title: "Frontier AI & DeepTech: Autonomous Agentic Workflows Transforming Modern Engineering",
  slug: "frontier-ai-deeptech-autonomous-agentic-workflows-modern-engineering",
  excerpt:
    "How multi-agent orchestrations, reactive message streams, and full-stack automation are reshaping modern web development and software architecture in 2026.",
  content:
    "<p>The transition from synchronous single-prompt LLM wrappers to multi-agent reactive software systems marks the biggest inflection point in software engineering since the advent of cloud computing. Autonomous coding agents are now executing end-to-end full stack lifecycles—from database modeling to live deployment.</p><p>In this technical breakdown, we explore architectural patterns for robust agentic pairs, isolated workspace sandboxing, and production-grade verification gates.</p>",
  featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  category: { id: 1, name: "Tech & Learning Hub", slug: "tech" },
  tags: [{ tag: { id: 1, name: "Tech & Innovation", slug: "tech" } }],
  isHero: true,
  isLive: false,
  publishedAt: new Date().toISOString(),
};

export const fallbackSubHeroPost: PostItem = {
  id: 2,
  title: "High-Altitude Passes of Ladakh: A Two-Week Solo Motorcycle Expedition Diary",
  slug: "high-altitude-passes-ladakh-motorcycle-expedition-diary",
  excerpt:
    "Navigating Chang La, Nubra Valley, and Pangong Tso—lessons in mechanical resilience, high-altitude acclimatization, and remote mountain navigation.",
  content:
    "<p>Winding past snow-dusted switchbacks at 17,500 feet, Ladakh tests both rider and machine. In this travel essay, we document gear checklists, permit requirements, and route notes for independent travelers navigating Ladakh's outer frontiers.</p>",
  featuredImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
  category: { id: 2, name: "Travel Diaries", slug: "travel" },
  tags: [{ tag: { id: 2, name: "Travel Diaries", slug: "travel" } }],
  isHero: false,
  isLive: true,
  publishedAt: new Date().toISOString(),
};

export const fallbackLeftStories: PostItem[] = [
  {
    id: 10,
    title: "Deep Work Rituals: How to Protect 4 Hours of Uninterrupted Focus Every Morning",
    slug: "deep-work-rituals-protect-uninterrupted-focus-every-morning",
    excerpt: "Practical frameworks for eliminating distraction, calendar chunking, and cognitive flow states.",
    content: "<p>Attention residue from frequent context switching drains creative problem solving. Here is a battle-tested protocol for deep morning work blocks.</p>",
    featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop",
    category: { id: 3, name: "Personal Blog & Essays", slug: "personal-blog" },
    tags: [{ tag: { id: 3, name: "Personal Growth", slug: "personal-blog" } }],
  },
  {
    id: 11,
    title: "Building Production FullStack Next.js 15 Apps with Prisma and MySQL",
    slug: "building-production-fullstack-nextjs-15-prisma-mysql",
    excerpt: "Comprehensive guide to connection pooling, ISR caching, and zero-downtime Hostinger deployments.",
    content: "<p>Next.js 15 brings powerful App Router enhancements. We walk through best practices for Prisma connection lifecycles on LiteSpeed web servers.</p>",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
    category: { id: 1, name: "Tech & Learning Hub", slug: "tech" },
    tags: [{ tag: { id: 1, name: "Software Dev", slug: "tech" } }],
  },
  {
    id: 12,
    title: "Calcium, Vitamin D3 & Bone Mineral Density: What Matters Beyond Supplementation",
    slug: "calcium-for-bone-health-what-matters-beyond-intake",
    excerpt: "Nutritional science on resistance training, vitamin K2 co-factors, and circadian absorption.",
    content: "<p>Evidence shows bone remodeling requires dynamic mechanical stress alongside nutritional mineral intake.</p>",
    featuredImage: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=400&auto=format&fit=crop",
    category: { id: 4, name: "Health & Wellness", slug: "health" },
    tags: [{ tag: { id: 4, name: "Health & Wellness", slug: "health" } }],
  },
  {
    id: 13,
    title: "Global Equity Markets: Central Bank Liquidity Cycles & Tech Valuation Shifts",
    slug: "global-equity-markets-central-bank-liquidity-cycles",
    excerpt: "Analyzing bond yields, macroeconomic inflation indicators, and semiconductor capital expenditures.",
    content: "<p>Global liquidity cycles continue to drive institutional allocations towards enterprise infrastructure and semiconductor manufacturing.</p>",
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
    category: { id: 5, name: "Business & Markets", slug: "business" },
    tags: [{ tag: { id: 5, name: "Business & Markets", slug: "business" } }],
  },
  {
    id: 14,
    title: "Formula 1 Aero Regulations 2026: Active Aerodynamics and Sustainable Powertrains",
    slug: "formula-1-aero-regulations-2026-active-aerodynamics",
    excerpt: "Technical breakdown of next-generation ground effect downforce and 50/50 electrical hybrid deployment.",
    content: "<p>F1's 2026 regulations redefine chassis dynamics with active straight-line aero modes and 100% sustainable fuels.</p>",
    featuredImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&auto=format&fit=crop",
    category: { id: 6, name: "Sports & Outdoors", slug: "sports" },
    tags: [{ tag: { id: 6, name: "Sports", slug: "sports" } }],
  },
];

async function withDbTimeout<T>(fn: () => Promise<T>, fallback: T, timeoutMs = 800): Promise<T> {
  // If default local placeholder is present and no local MySQL is listening, return fallback instantly
  if (process.env.DATABASE_URL?.includes("root:password@localhost:3306")) {
    return fallback;
  }
  try {
    const timer = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Database connection timeout")), timeoutMs)
    );
    const result = await Promise.race([fn(), timer]);
    return result || fallback;
  } catch {
    return fallback;
  }
}

export async function getCategoriesWithSubs(): Promise<CategoryItem[]> {
  return withDbTimeout(
    async () => {
      const cats = await prisma.category.findMany({
        where: { parentId: null },
        include: {
          subcategories: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      });
      return cats && cats.length > 0 ? cats : fallbackCategories;
    },
    fallbackCategories
  );
}

export async function getInTheNews(): Promise<InTheNewsItemData[]> {
  return withDbTimeout(
    async () => {
      const items = await prisma.inTheNewsItem.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });
      return items && items.length > 0 ? items : fallbackTickerItems;
    },
    fallbackTickerItems
  );
}

export async function getEditorialFeed() {
  const defaultFeed = {
    hero: fallbackHeroPost,
    subHero: fallbackSubHeroPost,
    leftStories: fallbackLeftStories,
  };

  return withDbTimeout(
    async () => {
      const hero = await prisma.post.findFirst({
        where: { isHero: true, status: "PUBLISHED" },
        include: { category: true, tags: { include: { tag: true } } },
      });
      const subHero = await prisma.post.findFirst({
        where: { isLive: true, status: "PUBLISHED" },
        include: { category: true, tags: { include: { tag: true } } },
      });
      const leftStories = await prisma.post.findMany({
        where: { isTrending: true, status: "PUBLISHED" },
        include: { category: true, tags: { include: { tag: true } } },
        take: 6,
      });

      if (hero) {
        return {
          hero: hero as unknown as PostItem,
          subHero: (subHero ?? fallbackSubHeroPost) as unknown as PostItem,
          leftStories: (leftStories.length > 0 ? leftStories : fallbackLeftStories) as unknown as PostItem[],
        };
      }
      return defaultFeed;
    },
    defaultFeed
  );
}
