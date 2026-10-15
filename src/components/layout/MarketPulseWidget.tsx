"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketPulseWidget() {
  const [indexIdx, setIndexIdx] = useState(0);

  const indices = [
    { name: "Nifty 50", value: "24,845.20", change: "+0.68%", isPositive: true },
    { name: "Sensex", value: "81,520.40", change: "+0.54%", isPositive: true },
    { name: "Nasdaq", value: "18,290.10", change: "+0.82%", isPositive: true },
    { name: "BTC / USD", value: "$67,420", change: "-0.24%", isPositive: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndexIdx((prev) => (prev + 1) % indices.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [indices.length]);

  const current = indices[indexIdx];

  return (
    <div
      onClick={() => setIndexIdx((prev) => (prev + 1) % indices.length)}
      className="flex flex-col border-r border-[#E2E2E6] pr-6 cursor-pointer select-none group"
      title="Click to cycle market indices"
    >
      <div className="flex items-center justify-between gap-1 text-[10px] tracking-wider uppercase font-semibold text-[#777777]">
        <span>MARKETS PULSE</span>
        <span className="text-[9px] text-gray-400 font-mono">({indexIdx + 1}/{indices.length})</span>
      </div>
      <div className="flex items-center gap-1.5 font-bold text-[#111111] transition-all duration-300">
        <span className="group-hover:text-[#C7102E] transition-colors">{current.name}</span>
        <span
          className={`flex items-center text-xs font-semibold ${
            current.isPositive ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {current.change} {current.isPositive ? "▲" : "▼"}
        </span>
      </div>
    </div>
  );
}
