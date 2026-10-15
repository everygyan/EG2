import { getEditorialFeed } from "@/lib/data";
import LeftStoriesColumn from "@/components/magazine/LeftStoriesColumn";
import HeroStoryColumn from "@/components/magazine/HeroStoryColumn";
import RightSidebar from "@/components/magazine/RightSidebar";

interface HomePageProps {
  searchParams: Promise<{ feed?: string }>;
}

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage({ searchParams }: HomePageProps) {
  const { feed } = await searchParams;
  const { hero, subHero, leftStories } = await getEditorialFeed();

  // If a specific feed filter is applied (e.g. "Tech", "Travel", "Learning")
  let filteredLeftStories = leftStories;
  if (feed && feed.toLowerCase() !== "plus" && feed.toLowerCase() !== "top stories") {
    const term = feed.toLowerCase();
    filteredLeftStories = leftStories.filter(
      (s) =>
        s.category?.name.toLowerCase().includes(term) ||
        s.category?.slug.toLowerCase().includes(term) ||
        s.tags?.some((t) => t.tag.name.toLowerCase().includes(term))
    );
    // If empty after strict filter, keep all so the column doesn't collapse
    if (filteredLeftStories.length === 0) {
      filteredLeftStories = leftStories;
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-0 w-full">
      {/* Column 1: Left Secondary Stories */}
      <LeftStoriesColumn stories={filteredLeftStories} />

      {/* Column 2: Center Primary Hero + Live Sub-story */}
      <HeroStoryColumn hero={hero} subHero={subHero} />

      {/* Column 3: Right Ad & Monetization Sidebar */}
      <RightSidebar />
    </div>
  );
}
