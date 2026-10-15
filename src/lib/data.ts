import prisma from "./prisma";
import { CategoryItem, InTheNewsItemData, PostItem } from "@/types";

// Default fallback data matching the EveryGyan screenshot
export const fallbackCategories: CategoryItem[] = [
  {
    id: 1,
    name: "Tech & Innovation",
    slug: "tech",
    subcategories: [
      { id: 101, name: "AI & DeepTech", slug: "ai-deeptech" },
      { id: 102, name: "Gadgets Now", slug: "gadgets-now" },
      { id: 103, name: "Software & Dev", slug: "software-dev" },
      { id: 104, name: "Startups", slug: "startups" },
    ],
  },
  {
    id: 2,
    name: "Travel Guide",
    slug: "travel",
    subcategories: [
      { id: 201, name: "Asia Expeditions", slug: "asia" },
      { id: 202, name: "Europe Escapes", slug: "europe" },
      { id: 203, name: "Budget Backpacking", slug: "budget-travel" },
      { id: 204, name: "Itineraries", slug: "itineraries" },
    ],
  },
  {
    id: 3,
    name: "Learning Portal",
    slug: "learning",
    subcategories: [
      { id: 301, name: "Coding Masterclass", slug: "coding" },
      { id: 302, name: "Career Growth", slug: "career" },
      { id: 303, name: "Financial Literacy", slug: "finance" },
      { id: 304, name: "Science & Research", slug: "science" },
    ],
  },
  {
    id: 4,
    name: "Personal Blog",
    slug: "personal-blog",
    subcategories: [
      { id: 401, name: "Reflections", slug: "reflections" },
      { id: 402, name: "Productivity", slug: "productivity" },
      { id: 403, name: "Book Notes", slug: "books" },
    ],
  },
  {
    id: 5,
    name: "Business",
    slug: "business",
    subcategories: [
      { id: 501, name: "Markets Pulse", slug: "markets" },
      { id: 502, name: "Economy", slug: "economy" },
    ],
  },
];

export const fallbackTickerItems: InTheNewsItemData[] = [
  { id: 1, title: "Meril Medithon", linkUrl: "#", order: 1 },
  { id: 2, title: "Diaspora Dialogues By EveryGyan™", linkUrl: "#", order: 2 },
  { id: 3, title: "Civic Action", linkUrl: "#", order: 3 },
  { id: 4, title: "Ask Apollo", linkUrl: "#", order: 4 },
  { id: 5, title: "Fashion & Beauty Awards", linkUrl: "#", order: 5 },
  { id: 6, title: "EveryGyan Healing India Forum", linkUrl: "#", order: 6 },
  { id: 7, title: "Parentology", linkUrl: "#", order: 7 },
  { id: 8, title: "Climate & Monsoon Watch", linkUrl: "#", order: 8 },
];

export const fallbackHeroPost: PostItem = {
  id: 1,
  title: "Municipal enforcement drive: Authorities clear illegal structures, major fire contained in Punjab",
  slug: "municipal-enforcement-drive-authorities-clear-illegal-structures-punjab",
  excerpt:
    "Civic departments in Punjab intensified clearance operations against unauthorized encroachments today while emergency teams successfully contained a major industrial fire outbreak.",
  content:
    "<p>Civic departments across major hubs launched an extensive campaign targeting illegal infrastructure and non-compliant commercial spaces. Heavy machinery and enforcement squads were deployed early this morning to clear encroached public corridors.</p><p>Simultaneously, state disaster management and emergency fire tenders contained a major industrial fire outbreak in the state's manufacturing belt without casualties.</p>",
  featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?q=80&w=1200&auto=format&fit=crop",
  category: { id: 1, name: "Tech & Governance", slug: "tech" },
  isHero: true,
  isLive: false,
  publishedAt: new Date().toISOString(),
};

export const fallbackSubHeroPost: PostItem = {
  id: 2,
  title: "Youth delegation begins march from Patel Chowk to 'reclaim' Jantar Mantar",
  slug: "youth-delegation-begins-march-from-patel-chowk-to-reclaim-jantar-mantar",
  excerpt: "Hundreds of student representatives assembled at Patel Chowk before marching towards Jantar Mantar.",
  content: "<p>Live coverage as student representatives assemble and proceed towards Jantar Mantar.</p>",
  featuredImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
  category: { id: 1, name: "City Pulse", slug: "city" },
  isHero: false,
  isLive: true,
  publishedAt: new Date().toISOString(),
};

export const fallbackLeftStories: PostItem[] = [
  {
    id: 10,
    title: "Meet Daniil Prokofev, 17, whose safer walking app is being piloted by 14 schools",
    slug: "meet-daniil-prokofev-17-whose-safer-walking-app-is-piloted",
    excerpt: "Teenager Daniil Prokofev built a community walking safety app.",
    content: "<p>Teenager Daniil Prokofev built a community walking safety app currently being piloted by 14 schools.</p>",
    featuredImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
    category: { id: 1, name: "Tech", slug: "tech" },
    tags: [{ tag: { id: 1, name: "Tech News", slug: "tech-news" } }],
  },
  {
    id: 11,
    title: "US ends 540-day grace period for immigrants after work authorisation expires",
    slug: "us-ends-540-day-grace-period-for-immigrants",
    excerpt: "New policy adjustments affect temporary work authorization extensions.",
    content: "<p>New policy adjustments affect temporary work authorization extensions for immigrants.</p>",
    category: { id: 1, name: "Tech", slug: "tech" },
    tags: [{ tag: { id: 1, name: "Tech News", slug: "tech-news" } }],
  },
  {
    id: 12,
    title: "Calcium for bone health: What matters beyond intake",
    slug: "calcium-for-bone-health-what-matters-beyond-intake",
    excerpt: "Nutritional insights on mineral absorption and lifestyle factors.",
    content: "<p>Nutritional insights on mineral absorption and lifestyle factors beyond calcium intake.</p>",
    category: { id: 4, name: "Health", slug: "health" },
    tags: [{ tag: { id: 2, name: "Health & Fitness", slug: "health-fitness" } }],
  },
  {
    id: 13,
    title: "Your journey, your care: The rise of personalised orthopedics",
    slug: "your-journey-your-care-rise-of-personalised-orthopedics",
    excerpt: "Customized implants and surgical roadmaps transformed by modern 3D modeling.",
    content: "<p>Customized implants and surgical roadmaps transformed by modern 3D modeling.</p>",
    category: { id: 4, name: "Health", slug: "health" },
    tags: [{ tag: { id: 3, name: "Health", slug: "health" } }],
  },
  {
    id: 14,
    title: "Cardboard garden beds cut weed cover to 15% by second season in USDA trial",
    slug: "cardboard-garden-beds-cut-weed-cover-to-15-percent",
    excerpt: "Sustainable agricultural study proves effective organic weed suppression.",
    content: "<p>Sustainable agricultural study proves effective organic weed suppression.</p>",
    category: { id: 3, name: "Science", slug: "science" },
    tags: [{ tag: { id: 4, name: "Experiments & Discoveries", slug: "experiments-discoveries" } }],
  },
];

export async function getCategoriesWithSubs(): Promise<CategoryItem[]> {
  try {
    const cats = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        subcategories: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    if (cats && cats.length > 0) {
      return cats;
    }
  } catch (error) {
    console.warn("Using fallback categories (DB not yet seeded or connected):", error);
  }
  return fallbackCategories;
}

export async function getInTheNews(): Promise<InTheNewsItemData[]> {
  try {
    const items = await prisma.inTheNewsItem.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    if (items && items.length > 0) return items;
  } catch (error) {
    console.warn("Using fallback ticker items:", error);
  }
  return fallbackTickerItems;
}

export async function getEditorialFeed() {
  try {
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
  } catch (error) {
    console.warn("Using fallback editorial feed:", error);
  }

  return {
    hero: fallbackHeroPost,
    subHero: fallbackSubHeroPost,
    leftStories: fallbackLeftStories,
  };
}
