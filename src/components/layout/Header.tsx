import Link from "next/link";
import { Twitter, Instagram, Youtube, Linkedin, Facebook } from "lucide-react";
import UserNav from "./UserNav";

export default function Header() {
  const socialLinks = [
    {
      name: "X (Twitter)",
      href: "https://twitter.com/everygyan",
      icon: Twitter,
      hoverClass: "hover:bg-[#000000] hover:text-white hover:border-[#000000]",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/everygyan",
      icon: Instagram,
      hoverClass: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@everygyan",
      icon: Youtube,
      hoverClass: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/everygyan",
      icon: Linkedin,
      hoverClass: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/everygyan",
      icon: Facebook,
      hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
  ];

  return (
    <header className="border-b border-[#E2E2E6] bg-white pt-3.5 pb-4">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
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

          {/* Top Right: Social Media Icons + User Auth Menu */}
          <div className="flex items-center flex-wrap gap-3 sm:gap-5 self-start md:self-center">
            
            {/* Social Media Link Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    title={item.name}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 text-gray-600 bg-gray-50/70 flex items-center justify-center transition-all duration-200 ${item.hoverClass}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

            {/* Vertical Divider */}
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

            {/* User Login/Register or Profile Dropdown */}
            <UserNav />

          </div>

        </div>
      </div>
    </header>
  );
}
