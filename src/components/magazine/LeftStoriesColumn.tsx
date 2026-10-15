import Link from "next/link";
import Image from "next/image";
import { PostItem } from "@/types";

interface LeftStoriesColumnProps {
  stories: PostItem[];
}

export default function LeftStoriesColumn({ stories }: LeftStoriesColumnProps) {
  if (!stories || stories.length === 0) return null;

  const firstStory = stories[0];
  const remainingStories = stories.slice(1);

  return (
    <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#E2E2E6] pb-6 lg:pb-0 lg:pr-5 space-y-5">
      
      {/* First Featured Left Story (with Thumbnail) */}
      {firstStory && (
        <article className="pb-4 border-b border-[#EBEBEF]">
          <Link href={`/article/${firstStory.slug}`} className="group block space-y-2.5">
            <h3 className="text-[15px] font-bold text-[#111111] leading-snug group-hover:text-[#C7102E] transition-colors">
              {firstStory.title}
            </h3>
            {firstStory.featuredImage && (
              <div className="relative w-full h-[140px] rounded-sm overflow-hidden bg-gray-100">
                <Image
                  src={firstStory.featuredImage}
                  alt={firstStory.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
            )}
          </Link>
        </article>
      )}

      {/* Stacked Secondary News Items */}
      <div className="space-y-4">
        {remainingStories.map((story) => {
          const tagName = story.tags?.[0]?.tag?.name || story.category?.name || "News";
          return (
            <article key={story.id} className="pb-3.5 border-b border-[#EBEBEF] last:border-b-0">
              <Link href={`/article/${story.slug}`} className="group block space-y-1">
                <span className="text-[11px] font-bold text-[#C7102E] uppercase tracking-wide block">
                  {tagName}
                </span>
                <h4 className="text-[13.5px] font-bold text-[#111111] leading-snug group-hover:text-[#C7102E] transition-colors">
                  {story.title}
                </h4>
              </Link>
            </article>
          );
        })}
      </div>

    </aside>
  );
}
