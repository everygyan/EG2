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
      { id: 104, name: "Cloud & DevOps", slug: "cloud-devops" },
      { id: 105, name: "Startups & VC", slug: "startups" },
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
      { id: 204, name: "Visa & Flight Hacks", slug: "visa-guides" },
      { id: 205, name: "Curated Itineraries", slug: "itineraries" },
    ],
  },
  {
    id: 3,
    name: "Learning Portal",
    slug: "learning",
    subcategories: [
      { id: 301, name: "Coding Masterclass", slug: "coding" },
      { id: 302, name: "FullStack Next.js & React", slug: "fullstack" },
      { id: 303, name: "AI Engineering & Agents", slug: "ai-engineering" },
      { id: 304, name: "Financial Literacy & Investing", slug: "finance" },
      { id: 305, name: "Career & Leadership", slug: "career" },
    ],
  },
  {
    id: 4,
    name: "Personal Blog",
    slug: "personal-blog",
    subcategories: [
      { id: 401, name: "Life Reflections", slug: "reflections" },
      { id: 402, name: "Deep Work & Habits", slug: "productivity" },
      { id: 403, name: "Book Summaries", slug: "books" },
      { id: 404, name: "Tech Experiments", slug: "experiments" },
    ],
  },
  {
    id: 5,
    name: "Business",
    slug: "business",
    subcategories: [
      { id: 501, name: "Markets Pulse", slug: "markets" },
      { id: 502, name: "Global Economy", slug: "economy" },
      { id: 503, name: "Venture Capital", slug: "vc" },
      { id: 504, name: "Real Estate & Infrastructure", slug: "real-estate" },
    ],
  },
  {
    id: 6,
    name: "Videos",
    slug: "videos",
    subcategories: [
      { id: 601, name: "Documentaries", slug: "documentaries" },
      { id: 602, name: "Tech Teardowns", slug: "tech-teardowns" },
      { id: 603, name: "Travel Vlogs", slug: "travel-vlogs" },
    ],
  },
  {
    id: 7,
    name: "City",
    slug: "city",
    subcategories: [
      { id: 701, name: "Delhi NCR", slug: "delhi" },
      { id: 702, name: "Mumbai", slug: "mumbai" },
      { id: 703, name: "Bengaluru", slug: "bengaluru" },
      { id: 704, name: "Hyderabad", slug: "hyderabad" },
    ],
  },
  {
    id: 8,
    name: "India",
    slug: "india",
    subcategories: [
      { id: 801, name: "Governance & Law", slug: "governance" },
      { id: 802, name: "Economic Reform", slug: "reforms" },
      { id: 803, name: "Science & Space (ISRO)", slug: "isro" },
    ],
  },
  {
    id: 9,
    name: "World",
    slug: "world",
    subcategories: [
      { id: 901, name: "Americas", slug: "americas" },
      { id: 902, name: "Europe & UK", slug: "europe-news" },
      { id: 903, name: "Asia-Pacific", slug: "asia-pacific" },
    ],
  },
  {
    id: 10,
    name: "Cricket",
    slug: "cricket",
    subcategories: [
      { id: 1001, name: "IPL Coverage", slug: "ipl" },
      { id: 1002, name: "Test Cricket", slug: "tests" },
      { id: 1003, name: "Stats & Commentary", slug: "stats" },
    ],
  },
  {
    id: 11,
    name: "Sports",
    slug: "sports",
    subcategories: [
      { id: 1101, name: "Football / UCL", slug: "football" },
      { id: 1102, name: "Formula 1", slug: "f1" },
      { id: 1103, name: "Tennis", slug: "tennis" },
    ],
  },
  {
    id: 12,
    name: "Entertainment",
    slug: "entertainment",
    subcategories: [
      { id: 1201, name: "Film Reviews", slug: "film-reviews" },
      { id: 1202, name: "OTT & Web Series", slug: "ott" },
      { id: 1203, name: "Music & Culture", slug: "music" },
    ],
  },
  {
    id: 13,
    name: "Auto",
    slug: "auto",
    subcategories: [
      { id: 1301, name: "Electric Vehicles (EV)", slug: "ev" },
      { id: 1302, name: "Supercars", slug: "supercars" },
      { id: 1303, name: "Motorcycles", slug: "bikes" },
    ],
  },
  {
    id: 14,
    name: "EveryGyan Women",
    slug: "women",
    subcategories: [
      { id: 1401, name: "Leadership & Enterprise", slug: "leadership" },
      { id: 1402, name: "Health & Wellbeing", slug: "wellness" },
      { id: 1403, name: "Women in STEM", slug: "stem" },
    ],
  },
  {
    id: 15,
    name: "TV",
    slug: "tv",
    subcategories: [
      { id: 1501, name: "Primetime Shows", slug: "primetime" },
      { id: 1502, name: "Special Reports", slug: "special-reports" },
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
