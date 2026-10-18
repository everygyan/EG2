import Link from "next/link";
import { Lock } from "lucide-react";
import { UNIFIED_PILLARS, FOOTER_SPECIALS, FOOTER_USER_LINKS } from "@/lib/constants/navigation";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#111111] text-white pt-12 pb-8 text-xs border-t-4 border-[#C7102E]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Core Knowledge Pillars */}
          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              Knowledge Desks
            </h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              {UNIFIED_PILLARS.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    href={pillar.href}
                    className="hover:text-white transition"
                  >
                    {pillar.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Special Coverage & Feeds */}
          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              Special Coverage
            </h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              {FOOTER_SPECIALS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Member & Admin Services */}
          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              Account & Publishing
            </h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              {FOOTER_USER_LINKS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition font-medium text-gray-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About EveryGyan */}
          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              About EveryGyan
            </h4>
            <p className="text-[#AAAAAA] leading-relaxed mb-3">
              A high-impact publication dedicated to deep tech engineering, personal essays, global travel memoirs, and evidence-based wellness.
            </p>
            <div className="text-[11px] text-[#777777]">
              Hosted with ⚡ LiteSpeed on Hostinger Business
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-[#777777] gap-3">
          <p>© {new Date().getFullYear()} EveryGyan Media. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gray-400">Contact Desk</Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition"
              title="Author & Admin Dashboard"
            >
              <Lock className="w-3 h-3 text-[#C7102E]" />
              <span>Author Dashboard</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
