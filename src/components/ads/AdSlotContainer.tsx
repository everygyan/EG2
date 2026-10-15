"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ExternalLink } from "lucide-react";

interface AdSlotContainerProps {
  slotKey: string;
  format?: "leaderboard" | "rectangle" | "halfpage" | "in_article";
  className?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  targetUrl?: string;
  adSenseSlot?: string;
}

export default function AdSlotContainer({
  slotKey,
  format = "rectangle",
  className = "",
  title = "Partner Spotlight",
  subtitle = "Discover curated tech & lifestyle recommendations",
  imageUrl,
  ctaText = "Learn More →",
  targetUrl = "#",
  adSenseSlot,
}: AdSlotContainerProps) {
  // Format-specific sizing classes to prevent CLS (Layout Shift)
  const sizeClasses = {
    leaderboard: "w-full max-w-[728px] min-h-[90px] mx-auto",
    rectangle: "w-full max-w-[300px] min-h-[250px] mx-auto",
    halfpage: "w-full max-w-[300px] min-h-[600px] mx-auto",
    in_article: "w-full max-w-[650px] min-h-[140px] my-6 mx-auto",
  }[format];

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Required Publisher Policy Disclaimer */}
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#999999] px-1 font-medium">
        <span>Advertisement</span>
        <span className="text-[9px] text-gray-400 font-mono">#{slotKey}</span>
      </div>

      {/* Ad Box */}
      <div
        className={`border border-[#E5E5EB] rounded-lg bg-[#FAFAFC] overflow-hidden flex flex-col justify-between p-4 shadow-2xs relative ${sizeClasses}`}
      >
        {imageUrl ? (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="relative w-full h-32 rounded overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-1">{title}</h4>
              <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{subtitle}</p>
            </div>
            <Link
              href={targetUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-[#111111] hover:bg-[#C7102E] text-white text-xs font-bold rounded transition mt-1"
            >
              <span>{ctaText}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-2 space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#FFF0F2] text-[#C7102E] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{title}</h4>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto mt-0.5">{subtitle}</p>
            </div>
            <Link
              href={targetUrl}
              className="text-xs font-bold text-[#C7102E] hover:underline inline-flex items-center gap-1"
            >
              <span>{ctaText}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
