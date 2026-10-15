"use client";

import { useState, useEffect } from "react";
import { Share2, Check, Twitter, Linkedin, MessageCircle } from "lucide-react";

interface ArticleInteractiveBarProps {
  title: string;
  url?: string;
}

export default function ArticleInteractiveBar({ title, url }: ArticleInteractiveBarProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : url || "https://everygyan.com";

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`, "_blank");
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-[#C7102E] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Share Actions Bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={shareTwitter}
          aria-label="Share on X / Twitter"
          className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:text-black hover:border-black transition"
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={shareWhatsApp}
          aria-label="Share on WhatsApp"
          className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-600 transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={shareLinkedIn}
          aria-label="Share on LinkedIn"
          className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-gray-200 rounded-full hover:bg-gray-100 text-gray-700 transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
