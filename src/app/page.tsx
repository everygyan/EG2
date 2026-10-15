import { getEditorialFeed } from "@/lib/data";
import LeftStoriesColumn from "@/components/magazine/LeftStoriesColumn";
import HeroStoryColumn from "@/components/magazine/HeroStoryColumn";
import RightSidebar from "@/components/magazine/RightSidebar";

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage() {
  const { hero, subHero, leftStories } = await getEditorialFeed();

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-0 w-full">
      {/* Column 1: Left Secondary Stories */}
      <LeftStoriesColumn stories={leftStories} />

      {/* Column 2: Center Primary Hero + Live Sub-story */}
      <HeroStoryColumn hero={hero} subHero={subHero} />

      {/* Column 3: Right Ad & Monetization Sidebar */}
      <RightSidebar />
    </div>
  );
}
