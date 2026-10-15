"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function FeedFilterBar() {
  const [activeFilter, setActiveFilter] = useState("Plus");
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="border-b border-[#F0F0F3] bg-[#FAFAFC] py-2 text-xs">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-[11px] uppercase tracking-wider text-[#C7102E]">
            SHOWING FEED:
          </span>
          <span className="bg-white border border-[#E0E0E4] px-2.5 py-0.5 rounded text-xs font-semibold text-[#222222]">
            {activeFilter}
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="flex items-center gap-1 text-[11px] font-medium text-[#C7102E] hover:text-[#9E0C24] transition"
        >
          <span>Reset View</span>
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
