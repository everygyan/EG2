import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding EveryGyan database...");

  // 1. Create Default Admin User
  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@everygyan.com" },
    update: {},
    create: {
      email: "admin@everygyan.com",
      name: "Devansh (Editor-in-Chief)",
      password: hashedPassword,
      role: "SUPERADMIN",
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // 2. Create Categories & Subcategories
  const mainCategories = [
    {
      name: "Tech & Innovation",
      slug: "tech",
      order: 1,
      subs: ["AI & DeepTech", "Gadgets Now", "Software & Dev", "Cloud & DevOps", "Startups"],
    },
    {
      name: "Travel Guide",
      slug: "travel",
      order: 2,
      subs: ["Asia Expeditions", "Europe Escapes", "Budget Backpacking", "Visa & Flight Hacks", "Itineraries"],
    },
    {
      name: "Learning Portal",
      slug: "learning",
      order: 3,
      subs: ["Coding Masterclass", "FullStack Next.js & React", "AI Engineering & Agents", "Financial Literacy", "Career Growth"],
    },
    {
      name: "Personal Blog",
      slug: "personal-blog",
      order: 4,
      subs: ["Life Reflections", "Deep Work & Habits", "Book Summaries", "Tech Experiments"],
    },
    {
      name: "Business",
      slug: "business",
      order: 5,
      subs: ["Markets Pulse", "Global Economy", "Venture Capital", "Real Estate"],
    },
    {
      name: "Videos",
      slug: "videos",
      order: 6,
      subs: ["Documentaries", "Tech Teardowns", "Travel Vlogs"],
    },
    {
      name: "City",
      slug: "city",
      order: 7,
      subs: ["Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad"],
    },
    {
      name: "India",
      slug: "india",
      order: 8,
      subs: ["Governance & Law", "Economic Reform", "Science & Space"],
    },
    {
      name: "World",
      slug: "world",
      order: 9,
      subs: ["Americas", "Europe & UK", "Asia-Pacific"],
    },
    {
      name: "Cricket",
      slug: "cricket",
      order: 10,
      subs: ["IPL Coverage", "Test Cricket", "Stats & Commentary"],
    },
    {
      name: "Sports",
      slug: "sports",
      order: 11,
      subs: ["Football / UCL", "Formula 1", "Tennis"],
    },
    {
      name: "Entertainment",
      slug: "entertainment",
      order: 12,
      subs: ["Film Reviews", "OTT & Web Series", "Music & Culture"],
    },
    {
      name: "Auto",
      slug: "auto",
      order: 13,
      subs: ["Electric Vehicles (EV)", "Supercars", "Motorcycles"],
    },
    {
      name: "EveryGyan Women",
      slug: "women",
      order: 14,
      subs: ["Leadership & Enterprise", "Health & Wellbeing", "Women in STEM"],
    },
    {
      name: "TV",
      slug: "tv",
      order: 15,
      subs: ["Primetime Shows", "Special Reports"],
    },
  ];

  const categoryMap = new Map<string, number>();

  for (const cat of mainCategories) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, order: cat.order },
      create: {
        name: cat.name,
        slug: cat.slug,
        order: cat.order,
      },
    });
    categoryMap.set(cat.slug, parent.id);

    // Create subcategories
    let subOrder = 1;
    for (const sub of cat.subs) {
      const subSlug = sub.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const createdSub = await prisma.category.upsert({
        where: { slug: subSlug },
        update: { name: sub, order: subOrder, parentId: parent.id },
        create: {
          name: sub,
          slug: subSlug,
          order: subOrder,
          parentId: parent.id,
        },
      });
      categoryMap.set(subSlug, createdSub.id);
      subOrder++;
    }
  }
  console.log("Categories and subcategories initialized.");

  // 3. Create "In The News" Ticker items
  const tickerItems = [
    { title: "Meril Medithon", order: 1 },
    { title: "Diaspora Dialogues By EveryGyan™", order: 2 },
    { title: "Civic Action", order: 3 },
    { title: "Ask Apollo", order: 4 },
    { title: "Fashion & Beauty Awards", order: 5 },
    { title: "EveryGyan Healing India Forum", order: 6 },
    { title: "Parentology", order: 7 },
    { title: "Climate & Monsoon Watch", order: 8 },
  ];

  await prisma.inTheNewsItem.deleteMany();
  for (const item of tickerItems) {
    await prisma.inTheNewsItem.create({
      data: {
        title: item.title,
        order: item.order,
        linkUrl: `/news/tag/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        isActive: true,
      },
    });
  }
  console.log("In The News ticker items initialized.");

  // 4. Create Tags
  const sampleTags = ["Tech News", "Health & Fitness", "Health", "Experiments & Discoveries", "Punjab", "Enforcement", "Youth"];
  const tagMap = new Map<string, number>();
  for (const tag of sampleTags) {
    const tSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const createdTag = await prisma.tag.upsert({
      where: { slug: tSlug },
      update: {},
      create: { name: tag, slug: tSlug },
    });
    tagMap.set(tag, createdTag.id);
  }

  // 5. Create Seed Posts (matching the screenshot layout)
  const techCatId = categoryMap.get("tech") || 1;
  const aiCatId = categoryMap.get("ai-deeptech") || techCatId;

  // Hero Story
  const heroPost = await prisma.post.upsert({
    where: { slug: "municipal-enforcement-drive-authorities-clear-illegal-structures-punjab" },
    update: {},
    create: {
      title: "Municipal enforcement drive: Authorities clear illegal structures, major fire contained in Punjab",
      slug: "municipal-enforcement-drive-authorities-clear-illegal-structures-punjab",
      excerpt: "Civic bodies in Punjab intensified clearance operations against unauthorized encroachments today while emergency teams successfully contained a high-intensity fire.",
      content: `<h2>Comprehensive Municipal Operations</h2><p>Civic departments across major hubs launched an extensive campaign targeting illegal infrastructure and non-compliant commercial spaces. Heavy machinery and enforcement squads were deployed early this morning to clear encroached public corridors.</p><p>Simultaneously, state disaster management and emergency fire tenders contained a major industrial fire outbreak in the state's manufacturing belt without casualties.</p>`,
      featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?q=80&w=1200&auto=format&fit=crop",
      authorId: admin.id,
      categoryId: techCatId,
      status: "PUBLISHED",
      isHero: true,
      isLive: false,
      isTrending: false,
      publishedAt: new Date(),
    },
  });

  // Secondary Left Stories
  const leftStories = [
    {
      title: "Meet Daniil Prokofev, 17, whose safer walking app is being piloted by 14 schools",
      slug: "meet-daniil-prokofev-17-whose-safer-walking-app-is-piloted",
      tag: "Tech News",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "US ends 540-day grace period for immigrants after work authorisation expires",
      slug: "us-ends-540-day-grace-period-for-immigrants",
      tag: "Tech News",
      image: null,
    },
    {
      title: "Calcium for bone health: What matters beyond intake",
      slug: "calcium-for-bone-health-what-matters-beyond-intake",
      tag: "Health & Fitness",
      image: null,
    },
    {
      title: "Your journey, your care: The rise of personalised orthopedics",
      slug: "your-journey-your-care-rise-of-personalised-orthopedics",
      tag: "Health",
      image: null,
    },
    {
      title: "Cardboard garden beds cut weed cover to 15% by second season in USDA trial",
      slug: "cardboard-garden-beds-cut-weed-cover-to-15-percent",
      tag: "Experiments & Discoveries",
      image: null,
    },
  ];

  for (const story of leftStories) {
    const post = await prisma.post.upsert({
      where: { slug: story.slug },
      update: {},
      create: {
        title: story.title,
        slug: story.slug,
        excerpt: story.title,
        content: `<p>Full comprehensive report on ${story.title} with in-depth analysis, expert commentary, and background data.</p>`,
        featuredImage: story.image,
        authorId: admin.id,
        categoryId: aiCatId,
        status: "PUBLISHED",
        isHero: false,
        isTrending: true,
        publishedAt: new Date(),
      },
    });

    const tagId = tagMap.get(story.tag);
    if (tagId) {
      await prisma.postTag.upsert({
        where: { postId_tagId: { postId: post.id, tagId } },
        update: {},
        create: { postId: post.id, tagId },
      });
    }
  }

  // Live bottom post
  await prisma.post.upsert({
    where: { slug: "youth-delegation-begins-march-from-patel-chowk-to-reclaim-jantar-mantar" },
    update: {},
    create: {
      title: "Youth delegation begins march from Patel Chowk to 'reclaim' Jantar Mantar",
      slug: "youth-delegation-begins-march-from-patel-chowk-to-reclaim-jantar-mantar",
      excerpt: "Hundreds of student representatives assembled at Patel Chowk before marching towards Jantar Mantar in an organized demonstration.",
      content: "<p>Live field reporting from Patel Chowk as delegates commence their march.</p>",
      featuredImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
      authorId: admin.id,
      categoryId: techCatId,
      status: "PUBLISHED",
      isHero: false,
      isLive: true,
      publishedAt: new Date(),
    },
  });

  // 6. Create Default Ad Slots
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

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
