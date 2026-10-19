import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UNIFIED_PILLARS } from "../src/lib/constants/navigation";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding EveryGyan database with unified knowledge pillars and authentic articles...");

  // 1. Create Default Admin User
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "AdminPassword123!", 10);
  const adminEmail = process.env.ADMIN_EMAIL || "admin@everygyan.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Devansh (Editor-in-Chief)",
      role: "SUPERADMIN",
    },
    create: {
      email: adminEmail,
      name: "Devansh (Editor-in-Chief)",
      password: hashedPassword,
      role: "SUPERADMIN",
    },
  });
  console.log(`Admin user initialized: ${admin.email}`);

  // 2. Cleanse Out Legacy Dummy Data
  const dummySlugs = [
    "municipal-enforcement-drive-authorities-clear-illegal-structures-punjab",
    "youth-delegation-begins-march-from-patel-chowk-to-reclaim-jantar-mantar",
    "meet-daniil-prokofev-17-whose-safer-walking-app-is-piloted",
    "us-ends-540-day-grace-period-for-immigrants",
    "cardboard-garden-beds-cut-weed-cover-to-15-percent",
    "your-journey-your-care-rise-of-personalised-orthopedics",
  ];

  try {
    await prisma.postTag.deleteMany({
      where: { post: { slug: { in: dummySlugs } } },
    });
    await prisma.post.deleteMany({
      where: { slug: { in: dummySlugs } },
    });
    console.log("Legacy dummy articles removed.");
  } catch (err) {
    console.warn("Legacy dummy cleanup note:", err);
  }

  // 3. Initialize Unified Categories
  const categoryMap = new Map<string, number>();

  let pillarOrder = 1;
  for (const pillar of UNIFIED_PILLARS) {
    const parent = await prisma.category.upsert({
      where: { slug: pillar.slug },
      update: { name: pillar.name, order: pillarOrder, description: pillar.description },
      create: { name: pillar.name, slug: pillar.slug, order: pillarOrder, description: pillar.description },
    });
    categoryMap.set(pillar.slug, parent.id);

    let subOrder = 1;
    for (const sub of pillar.subcategories) {
      const createdSub = await prisma.category.upsert({
        where: { slug: sub.slug },
        update: { name: sub.name, order: subOrder, parentId: parent.id, description: sub.description },
        create: { name: sub.name, slug: sub.slug, order: subOrder, parentId: parent.id, description: sub.description },
      });
      categoryMap.set(sub.slug, createdSub.id);
      subOrder++;
    }
    pillarOrder++;
  }

  // Videos channel
  const videoParent = await prisma.category.upsert({
    where: { slug: "videos" },
    update: { name: "Videos & Documentaries", order: pillarOrder },
    create: { name: "Videos & Documentaries", slug: "videos", order: pillarOrder },
  });
  categoryMap.set("videos", videoParent.id);

  const videoSubs = [
    { name: "Documentaries", slug: "documentaries" },
    { name: "Tech Teardowns", slug: "tech-teardowns" },
    { name: "Travel Vlogs", slug: "travel-vlogs" },
  ];
  for (const vSub of videoSubs) {
    const created = await prisma.category.upsert({
      where: { slug: vSub.slug },
      update: { name: vSub.name, parentId: videoParent.id },
      create: { name: vSub.name, slug: vSub.slug, parentId: videoParent.id },
    });
    categoryMap.set(vSub.slug, created.id);
  }
  console.log("Unified categories initialized.");

  // 4. Populate Clean In The News Ticker Items
  const tickerItems = [
    { title: "Tech & AI Frontier Summit 2026", linkUrl: "/category/tech/ai-deeptech", order: 1 },
    { title: "Diaspora Dialogues By EveryGyan™", linkUrl: "/category/personal-blog", order: 2 },
    { title: "Himalayan Expedition Routes Open", linkUrl: "/category/travel/asia", order: 3 },
    { title: "Longevity & Metabolic Biomarkers Guide", linkUrl: "/category/health", order: 4 },
    { title: "Next.js 15 Full-Stack Architecture", linkUrl: "/category/tech/fullstack", order: 5 },
    { title: "Global Markets & Venture Capital Shifts", linkUrl: "/category/business/markets", order: 6 },
  ];

  await prisma.inTheNewsItem.deleteMany();
  for (const item of tickerItems) {
    await prisma.inTheNewsItem.create({
      data: {
        title: item.title,
        order: item.order,
        linkUrl: item.linkUrl,
        isActive: true,
      },
    });
  }
  console.log("Clean ticker items initialized.");

  // 5. Populate Tags
  const coreTags = [
    "AI & DeepTech",
    "Software Engineering",
    "Web Architecture",
    "Travel Diaries",
    "Expeditions",
    "Personal Essays",
    "Deep Work",
    "Longevity",
    "Fitness",
    "Macro Markets",
    "Formula 1",
  ];
  const tagMap = new Map<string, number>();
  for (const tag of coreTags) {
    const tSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const createdTag = await prisma.tag.upsert({
      where: { slug: tSlug },
      update: { name: tag },
      create: { name: tag, slug: tSlug },
    });
    tagMap.set(tag, createdTag.id);
  }

  // 6. Seed Authentic EveryGyan Editorial Articles
  const techCatId = categoryMap.get("tech") || 1;
  const travelCatId = categoryMap.get("travel") || 2;
  const blogCatId = categoryMap.get("personal-blog") || 3;
  const healthCatId = categoryMap.get("health") || 4;
  const businessCatId = categoryMap.get("business") || 5;
  const sportsCatId = categoryMap.get("sports") || 6;

  const seedArticles = [
    {
      title: "Frontier AI & DeepTech: Autonomous Agentic Workflows Transforming Modern Engineering",
      slug: "frontier-ai-deeptech-autonomous-agentic-workflows-modern-engineering",
      excerpt: "How multi-agent orchestrations, reactive message streams, and full-stack automation are reshaping modern web development and software architecture in 2026.",
      content: `<h2>The Rise of Autonomous Agentic Software Systems</h2><p>The transition from synchronous single-prompt LLM wrappers to multi-agent reactive software systems marks the biggest inflection point in software engineering since the advent of cloud computing. Autonomous coding agents are now executing end-to-end full stack lifecycles—from database modeling to live deployment.</p><p>In this technical breakdown, we explore architectural patterns for robust agentic pairs, isolated workspace sandboxing, and production-grade verification gates.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      categoryId: techCatId,
      isHero: true,
      isLive: false,
      isTrending: false,
      tags: ["AI & DeepTech", "Software Engineering"],
    },
    {
      title: "High-Altitude Passes of Ladakh: A Two-Week Solo Motorcycle Expedition Diary",
      slug: "high-altitude-passes-ladakh-motorcycle-expedition-diary",
      excerpt: "Navigating Chang La, Nubra Valley, and Pangong Tso—lessons in mechanical resilience, high-altitude acclimatization, and remote mountain navigation.",
      content: `<p>Winding past snow-dusted switchbacks at 17,500 feet, Ladakh tests both rider and machine. In this travel essay, we document gear checklists, permit requirements, and route notes for independent travelers navigating Ladakh's outer frontiers.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
      categoryId: travelCatId,
      isHero: false,
      isLive: true,
      isTrending: false,
      tags: ["Travel Diaries", "Expeditions"],
    },
    {
      title: "Deep Work Rituals: How to Protect 4 Hours of Uninterrupted Focus Every Morning",
      slug: "deep-work-rituals-protect-uninterrupted-focus-every-morning",
      excerpt: "Practical frameworks for eliminating distraction, calendar chunking, and cognitive flow states.",
      content: `<p>Attention residue from frequent context switching drains creative problem solving. Here is a battle-tested protocol for deep morning work blocks.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop",
      categoryId: blogCatId,
      isHero: false,
      isLive: false,
      isTrending: true,
      tags: ["Personal Essays", "Deep Work"],
    },
    {
      title: "Building Production FullStack Next.js 15 Apps with Prisma and MySQL",
      slug: "building-production-fullstack-nextjs-15-prisma-mysql",
      excerpt: "Comprehensive guide to connection pooling, ISR caching, and zero-downtime Hostinger deployments.",
      content: `<p>Next.js 15 brings powerful App Router enhancements. We walk through best practices for Prisma connection lifecycles on LiteSpeed web servers.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
      categoryId: techCatId,
      isHero: false,
      isLive: false,
      isTrending: true,
      tags: ["Software Engineering", "Web Architecture"],
    },
    {
      title: "Calcium, Vitamin D3 & Bone Mineral Density: What Matters Beyond Supplementation",
      slug: "calcium-for-bone-health-what-matters-beyond-intake",
      excerpt: "Nutritional science on resistance training, vitamin K2 co-factors, and circadian absorption.",
      content: `<p>Evidence shows bone remodeling requires dynamic mechanical stress alongside nutritional mineral intake.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=400&auto=format&fit=crop",
      categoryId: healthCatId,
      isHero: false,
      isLive: false,
      isTrending: true,
      tags: ["Longevity", "Fitness"],
    },
    {
      title: "Global Equity Markets: Central Bank Liquidity Cycles & Tech Valuation Shifts",
      slug: "global-equity-markets-central-bank-liquidity-cycles",
      excerpt: "Analyzing bond yields, macroeconomic inflation indicators, and semiconductor capital expenditures.",
      content: `<p>Global liquidity cycles continue to drive institutional allocations towards enterprise infrastructure and semiconductor manufacturing.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
      categoryId: businessCatId,
      isHero: false,
      isLive: false,
      isTrending: true,
      tags: ["Macro Markets"],
    },
    {
      title: "Formula 1 Aero Regulations 2026: Active Aerodynamics and Sustainable Powertrains",
      slug: "formula-1-aero-regulations-2026-active-aerodynamics",
      excerpt: "Technical breakdown of next-generation ground effect downforce and 50/50 electrical hybrid deployment.",
      content: `<p>F1's 2026 regulations redefine chassis dynamics with active straight-line aero modes and 100% sustainable fuels.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&auto=format&fit=crop",
      categoryId: sportsCatId,
      isHero: false,
      isLive: false,
      isTrending: true,
      tags: ["Formula 1"],
    },
    {
      title: "The Art of Slow Productivity in a Hyperactive World",
      slug: "the-art-of-slow-productivity",
      excerpt: "Why working at a natural cadence and focusing on fewer projects leads to meaningful creative breakthroughs.",
      content: `<p>Slow productivity is not about doing less for the sake of laziness; it is the deliberate refusal to overload working memory with shallow administrative obligations.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop",
      categoryId: blogCatId,
      isHero: false,
      isLive: false,
      isTrending: false,
      tags: ["Personal Essays", "Deep Work"],
    },
    {
      title: "Seven Days in Kyoto: Temples, Matcha, and Ancient Alleys",
      slug: "seven-days-in-kyoto",
      excerpt: "A mindful walking guide through Japan's cultural capital, featuring early morning shrines and serene zen rock gardens.",
      content: `<p>From Arashiyama's whispering bamboo groves at dawn to the candlelit stone paths of Gion, Kyoto invites quiet exploration.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
      categoryId: travelCatId,
      isHero: false,
      isLive: false,
      isTrending: false,
      tags: ["Travel Diaries"],
    },
    {
      title: "Building Resilient Web Architectures: From Zero to Scale",
      slug: "building-scalable-web-architectures",
      excerpt: "A practical guide to database indexing, reverse proxies, and caching layers to ensure 99.99% uptime under load.",
      content: `<p>Designing web architectures capable of handling traffic spikes requires defensive caching, circuit breakers, and connection pool discipline.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
      categoryId: techCatId,
      isHero: false,
      isLive: false,
      isTrending: false,
      tags: ["Software Engineering", "Web Architecture"],
    },
  ];

  for (const article of seedArticles) {
    const post = await prisma.post.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        categoryId: article.categoryId,
        isHero: article.isHero,
        isLive: article.isLive,
        isTrending: article.isTrending,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        authorId: admin.id,
        categoryId: article.categoryId,
        status: "PUBLISHED",
        isHero: article.isHero,
        isLive: article.isLive,
        isTrending: article.isTrending,
        publishedAt: new Date(),
      },
    });

    for (const tName of article.tags) {
      const tagId = tagMap.get(tName);
      if (tagId) {
        await prisma.postTag.upsert({
          where: { postId_tagId: { postId: post.id, tagId } },
          update: {},
          create: { postId: post.id, tagId },
        });
      }
    }
  }
  console.log("Authentic EveryGyan articles seeded successfully.");

  // 7. Default Ad Slots
  await prisma.adSlot.upsert({
    where: { slotKey: "SIDEBAR_DIGITAL_ACCESS" },
    update: {},
    create: {
      slotKey: "SIDEBAR_DIGITAL_ACCESS",
      title: "EVERYGYAN+ DIGITAL ACCESS",
      priceLabel: "Ad-free journalism & exclusive global insights",
      buttonText: "Explore Plans →",
      targetUrl: "/plans",
      isActive: true,
    },
  });

  await prisma.adSlot.upsert({
    where: { slotKey: "SIDEBAR_MASTERCLASS" },
    update: {},
    create: {
      slotKey: "SIDEBAR_MASTERCLASS",
      title: "THE YOUNG LEADERS • STUDY SMART MASTERCLASS",
      priceLabel: "₹14,999",
      buttonText: "Register Today!",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop",
      targetUrl: "/masterclass",
      isActive: true,
    },
  });

  console.log("Seeding process completed cleanly!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
