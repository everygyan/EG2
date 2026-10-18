"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, SlidersHorizontal } from "lucide-react";

function FeedFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFeed = searchParams.get("feed") || "Plus";

  const feeds = [
    { label: "Plus", key: "Plus" },
    { label: "Top Stories", key: "Top Stories" },
    { label: "Tech & Learning", key: "tech" },
    { label: "Personal Blog", key: "personal-blog" },
    { label: "Travel Diaries", key: "travel" },
    { label: "Health & Wellness", key: "health" },
    { label: "Business", key: "business" },
    { label: "Sports", key: "sports" },
  ];

  const handleFeedSelect = (key: string) => {
    if (key === "Top Stories") {
      router.push("/");
    } else {
      router.push(`/?feed=${encodeURIComponent(key)}`);
    }
  };

  const handleReset = () => {
    router.push("/");
  };

  return (
    <div className="border-b border-[#F0F0F3] bg-[#FAFAFC] py-2 text-xs">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-bold text-[11px] uppercase tracking-wider text-[#C7102E] whitespace-nowrap flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>SHOWING FEED:</span>
          </span>
          
          <div className="flex items-center gap-1.5">
            {feeds.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFeedSelect(f.key)}
                className={`px-2.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap transition ${
                  activeFeed.toLowerCase() === f.key.toLowerCase() ||
                  activeFeed.toLowerCase() === f.label.toLowerCase()
                    ? "bg-[#C7102E] text-white shadow-xs"
                    : "bg-white border border-[#E0E0E4] text-[#444444] hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {activeFeed !== "Top Stories" && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#C7102E] hover:text-[#9E0C24] transition shrink-0 pl-3"
          >
            <span>Reset View</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

      </div>
    </div>
  );
}

export default function FeedFilterBar() {
  return (
    <Suspense
      fallback={
        <div className="border-b border-[#F0F0F3] bg-[#FAFAFC] py-2 text-xs">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 flex items-center gap-2">
            <span className="font-bold text-[11px] uppercase tracking-wider text-[#C7102E]">
              SHOWING FEED:
            </span>
            <span className="bg-white border border-[#E0E0E4] px-2.5 py-0.5 rounded text-xs font-semibold">
              Plus
            </span>
          </div>
        </div>
      }
    >
      <FeedFilterContent />
    </Suspense>
  );
}
