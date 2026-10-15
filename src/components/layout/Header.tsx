import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MarketPulseWidget from "./MarketPulseWidget";

export default function Header() {
  return (
    <header className="border-b border-[#E2E2E6] bg-white pt-3.5 pb-4">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="w-1.5 h-9 bg-[#C7102E] inline-block rounded-none"></span>
              <span className="text-4xl sm:text-[44px] font-bold font-masthead tracking-tight text-[#111111] group-hover:text-[#C7102E] transition-colors">
                Every<span className="text-[#C7102E]">Gyan</span>
              </span>
            </Link>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-[#555555] mt-1 pl-3.5">
              JOURNALISM &bull; KNOWLEDGE &bull; GLOBAL PERSPECTIVES
            </p>
          </div>

          {/* Top Right Market / Spotlight Tickers */}
          <div className="flex items-center gap-6 self-start md:self-center text-xs">
            {/* Dynamic Market Pulse Widget */}
            <MarketPulseWidget />

            {/* Gyan Spotlight */}
            <Link
              href="/category/tech"
              className="flex flex-col group hover:opacity-85 transition-opacity"
            >
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#777777]">
                GYAN SPOTLIGHT
              </span>
              <div className="flex items-center gap-1 font-bold text-[#111111] group-hover:text-[#C7102E]">
                <span>AI & DeepTech</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C7102E]" />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
