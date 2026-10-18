export interface SubCategoryConfig {
  id?: number;
  name: string;
  slug: string;
  href: string;
  description?: string;
}

export interface KnowledgePillar {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  href: string;
  tagline: string;
  description: string;
  iconName: "Cpu" | "BookOpen" | "Compass" | "HeartPulse" | "TrendingUp" | "Trophy" | "Video" | "Sparkles";
  accentColor: string;
  subcategories: SubCategoryConfig[];
}

/**
 * Single source of truth for EveryGyan's information architecture.
 * Unifies Top Navbar, Knowledge Pillars (Explore by Channel), and Footer.
 */
export const UNIFIED_PILLARS: KnowledgePillar[] = [
  {
    id: "tech-learning",
    name: "Tech & Learning Hub",
    shortName: "Tech & Learning",
    slug: "tech",
    href: "/category/tech",
    tagline: "DeepTech, AI Engineering & Software Mastery",
    description: "Hands-on engineering tutorials, frontier AI analysis, modern web architectures, and gadget teardowns.",
    iconName: "Cpu",
    accentColor: "#C7102E",
    subcategories: [
      { name: "AI & DeepTech", slug: "ai-deeptech", href: "/category/tech/ai-deeptech", description: "LLMs, agents & neural architectures" },
      { name: "FullStack Dev", slug: "fullstack", href: "/category/tech/fullstack", description: "Next.js, TypeScript & React systems" },
      { name: "Coding Masterclass", slug: "coding", href: "/category/tech/coding", description: "Algorithms, design patterns & clean code" },
      { name: "Gadgets & Hardware", slug: "gadgets-now", href: "/category/tech/gadgets-now", description: "Flagship reviews, silicon & specs" },
      { name: "Cloud & DevOps", slug: "cloud-devops", href: "/category/tech/cloud-devops", description: "Docker, Kubernetes & serverless" },
      { name: "Startups & VC", slug: "startups", href: "/category/tech/startups", description: "Product launches & funding rounds" },
    ],
  },
  {
    id: "personal-blog",
    name: "Personal Blog & Essays",
    shortName: "Personal Blog",
    slug: "personal-blog",
    href: "/category/personal-blog",
    tagline: "Life Reflections, Mental Models & Deep Work",
    description: "Philosophical notes, productivity experiments, book essays, and personal retrospectives on engineering and life.",
    iconName: "BookOpen",
    accentColor: "#2563EB",
    subcategories: [
      { name: "Life Reflections", slug: "reflections", href: "/category/personal-blog/reflections", description: "Essays on growth, ethics & mindset" },
      { name: "Deep Work & Habits", slug: "productivity", href: "/category/personal-blog/productivity", description: "Time management and focus rituals" },
      { name: "Book Summaries", slug: "books", href: "/category/personal-blog/books", description: "Key takeaways from seminal books" },
      { name: "Tech Experiments", slug: "experiments", href: "/category/personal-blog/experiments", description: "Weekend builds and code prototypes" },
    ],
  },
  {
    id: "travel-diaries",
    name: "Travel Diaries",
    shortName: "Travel Diaries",
    slug: "travel",
    href: "/category/travel",
    tagline: "Global Expeditions, Cultural Journeys & Field Guides",
    description: "Curated itineraries, photographic journals, budget travel hacks, and off-the-beaten-path expeditions.",
    iconName: "Compass",
    accentColor: "#059669",
    subcategories: [
      { name: "Asia Expeditions", slug: "asia", href: "/category/travel/asia", description: "Himalayan treks, Tokyo & tropical routes" },
      { name: "Europe Escapes", slug: "europe", href: "/category/travel/europe", description: "Alpine crossings and historic capitals" },
      { name: "Budget Backpacking", slug: "budget-travel", href: "/category/travel/budget-travel", description: "Hostel life, rail passes and nomad tips" },
      { name: "Visa & Flight Hacks", slug: "visa-guides", href: "/category/travel/visa-guides", description: "Passport guides, miles and transit" },
      { name: "Curated Itineraries", slug: "itineraries", href: "/category/travel/itineraries", description: "Step-by-step 3-day to 14-day routes" },
    ],
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    shortName: "Health & Wellness",
    slug: "health",
    href: "/category/health",
    tagline: "Longevity, Fitness, Nutrition & Mindful Living",
    description: "Evidence-based health insights, metabolic fitness, sleep optimization, and sustainable nutrition frameworks.",
    iconName: "HeartPulse",
    accentColor: "#E11D48",
    subcategories: [
      { name: "Fitness & Workouts", slug: "fitness", href: "/category/health/fitness", description: "Strength, endurance and mobility" },
      { name: "Nutrition & Diet", slug: "nutrition", href: "/category/health/nutrition", description: "Whole foods, macros and bone health" },
      { name: "Mental Health", slug: "mental-health", href: "/category/health/mental-health", description: "Mindfulness, stress and cognitive clarity" },
      { name: "Longevity Habits", slug: "longevity", href: "/category/health/longevity", description: "Sleep cycles and circadian health" },
      { name: "Preventive Care", slug: "preventive-health", href: "/category/health/preventive-health", description: "Screenings and wellness biomarkers" },
    ],
  },
  {
    id: "business-markets",
    name: "Business & Markets",
    shortName: "Business & Markets",
    slug: "business",
    href: "/category/business",
    tagline: "Macro Economics, Global Markets & Enterprise",
    description: "Macroeconomic analysis, equity market movements, venture capital flows, and startup strategy.",
    iconName: "TrendingUp",
    accentColor: "#D97706",
    subcategories: [
      { name: "Markets Pulse", slug: "markets", href: "/category/business/markets", description: "Daily equity & index movements" },
      { name: "Global Economy", slug: "economy", href: "/category/business/economy", description: "Central banks, inflation & trade" },
      { name: "Venture Capital", slug: "vc", href: "/category/business/vc", description: "Angel rounds and term sheet trends" },
      { name: "Real Estate", slug: "real-estate", href: "/category/business/real-estate", description: "Urban infrastructure and property" },
    ],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    shortName: "Sports",
    slug: "sports",
    href: "/category/sports",
    tagline: "Cricket, F1, Champions League & Athletics",
    description: "Tactical match breakdowns, Grand Prix telemetry, tournament schedules, and athlete profiles.",
    iconName: "Trophy",
    accentColor: "#7C3AED",
    subcategories: [
      { name: "Cricket & IPL", slug: "cricket", href: "/category/sports/cricket", description: "Ball-by-ball analysis and stats" },
      { name: "Football / UCL", slug: "football", href: "/category/sports/football", description: "European leagues and tactics" },
      { name: "Formula 1", slug: "f1", href: "/category/sports/f1", description: "Pit strategy and constructor standings" },
      { name: "Tennis Grand Slams", slug: "tennis", href: "/category/sports/tennis", description: "ATP, WTA & major tournament draws" },
    ],
  },
];

export interface NavItemConfig {
  label: string;
  href: string;
  catSlug?: string;
  isSpecial?: boolean;
  isLive?: boolean;
  subcategories?: SubCategoryConfig[];
}

/**
 * Top Navbar tab items
 */
export const TOP_NAV_ITEMS: NavItemConfig[] = [
  { label: "EveryGyan +", href: "/feed/plus", isSpecial: true },
  ...UNIFIED_PILLARS.map((pillar) => ({
    label: pillar.shortName,
    href: pillar.href,
    catSlug: pillar.slug,
    isSpecial: false,
    isLive: false,
    subcategories: pillar.subcategories,
  })),
  {
    label: "Videos",
    href: "/category/videos",
    catSlug: "videos",
    isSpecial: false,
    isLive: false,
    subcategories: [
      { name: "Documentaries", slug: "documentaries", href: "/category/videos/documentaries" },
      { name: "Tech Teardowns", slug: "tech-teardowns", href: "/category/videos/tech-teardowns" },
      { name: "Travel Vlogs", slug: "travel-vlogs", href: "/category/videos/travel-vlogs" },
    ],
  },
  { label: "Live", href: "/live", isLive: true },
];

/**
 * Footer link structure
 */
export const FOOTER_PILLARS = UNIFIED_PILLARS.map((p) => ({
  name: p.name,
  href: p.href,
}));

export const FOOTER_SPECIALS = [
  { name: "EveryGyan + Digital", href: "/feed/plus" },
  { name: "Live Wire Reporting", href: "/live" },
  { name: "Video Documentaries", href: "/category/videos" },
  { name: "Young Leaders Masterclass", href: "/masterclass" },
  { name: "Digital Membership Plans", href: "/plans" },
];

export const FOOTER_USER_LINKS = [
  { name: "Reader Sign In / Register", href: "/login" },
  { name: "Member Account Profile", href: "/profile" },
  { name: "Admin CMS Portal", href: "/admin" },
  { name: "XML Sitemap", href: "/sitemap.xml" },
];
