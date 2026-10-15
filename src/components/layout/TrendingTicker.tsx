import Link from "next/link";
import { InTheNewsItemData } from "@/types";

interface TrendingTickerProps {
  items: InTheNewsItemData[];
}

export default function TrendingTicker({ items }: TrendingTickerProps) {
  return (
    <div className="border-b border-[#EBEBEF] bg-white py-2 text-xs">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 flex items-center gap-3">
        
        {/* Label */}
        <div className="flex items-center gap-1 font-bold text-[#C7102E] whitespace-nowrap text-xs">
          <span>In The News</span>
        </div>

        {/* Horizontal Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.linkUrl}
              className="whitespace-nowrap px-2.5 py-1 text-[12px] font-normal text-[#444444] bg-[#F5F5F7] hover:bg-[#EAEAEA] hover:text-black rounded transition"
            >
              {item.title}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
