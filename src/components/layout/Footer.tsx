import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#111111] text-white pt-12 pb-8 text-xs border-t-4 border-[#C7102E]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              Editorial Sections
            </h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li><Link href="/category/tech" className="hover:text-white transition">Tech & Innovation</Link></li>
              <li><Link href="/category/travel" className="hover:text-white transition">Travel Guides</Link></li>
              <li><Link href="/category/learning" className="hover:text-white transition">Learning Portal</Link></li>
              <li><Link href="/category/personal-blog" className="hover:text-white transition">Personal Blog</Link></li>
              <li><Link href="/category/business" className="hover:text-white transition">Business & Markets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              Special Coverage
            </h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li><Link href="/feed/plus" className="hover:text-white transition">EveryGyan +</Link></li>
              <li><Link href="/live" className="hover:text-white transition">Live Coverage</Link></li>
              <li><Link href="/category/videos" className="hover:text-white transition">Video Documentaries</Link></li>
              <li><Link href="/masterclass" className="hover:text-white transition">Young Leaders Masterclass</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              Admin & Publisher
            </h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li><Link href="/admin/login" className="hover:text-white transition font-semibold text-gray-300">Admin CMS Portal</Link></li>
              <li><Link href="/admin/articles/new" className="hover:text-white transition">Publish New Article</Link></li>
              <li><Link href="/admin/categories" className="hover:text-white transition">Category Manager</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition">XML Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C7102E] font-bold uppercase tracking-wider text-xs mb-3">
              About EveryGyan
            </h4>
            <p className="text-[#AAAAAA] leading-relaxed mb-3">
              A high-impact personal portal dedicated to journalism, global perspectives, hands-on engineering tutorials, and travel memoirs.
            </p>
            <div className="text-[11px] text-[#777777]">
              Hosted with ⚡ LiteSpeed on Hostinger Business
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-[#777777] gap-3">
          <p>© {new Date().getFullYear()} EveryGyan Media. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gray-400">Contact Desk</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
