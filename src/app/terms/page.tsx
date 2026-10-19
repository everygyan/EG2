import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of EveryGyan's editorial platform, member accounts, and content syndication.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link href="/" className="text-gray-500 hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#C7102E] font-semibold">Terms of Service</span>
      </div>

      {/* Header */}
      <div className="border-b-2 border-[#C7102E] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C7102E] uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>EveryGyan Platform Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-serif">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500">
          Last revised: October 18, 2026 &bull; Published by EveryGyan Media
        </p>
      </div>

      {/* Content */}
      <div className="prose max-w-none text-[#333333] text-sm leading-relaxed space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or subscribing to EveryGyan (&quot;everygyan.com&quot;), including our web applications, RSS feeds,
            APIs, and digital newsletter dispatches, you agree to comply with and be bound by these Terms of Service.
            If you do not agree with any part of these terms, please do not use our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>2. Intellectual Property &amp; Content Attribution</span>
          </h2>
          <p>
            All original technical tutorials, engineering architecture breakdowns, investigative essays, photographs, and custom graphics
            published on EveryGyan are the intellectual property of EveryGyan Media or their respective contributing authors.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>You may quote excerpts (up to 200 words) with clear, clickable attribution linking directly to the original EveryGyan article URL.</li>
            <li>Full scraping, automated republication, or unauthorized mirroring of our articles is strictly prohibited.</li>
            <li>Open-source code snippets included within our programming tutorials are licensed under the MIT License for direct reader reuse.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span>3. Editorial Disclaimer</span>
          </h2>
          <p>
            EveryGyan publishes investigative analysis, engineering tutorials, travel memoirs, and health/wellness research for educational
            and informational purposes. Our health, longevity, and financial articles do not constitute personalized medical advice or financial consultancy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif">
            4. User Conduct &amp; Account Responsibility
          </h2>
          <p>
            Registered members are responsible for maintaining the confidentiality of their login credentials. Users must not engage in any activity that disrupts server operations, injects malicious payloads, or circumvents editorial access controls.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-bold text-[#111111]">
            Contact Legal &amp; Syndication
          </h2>
          <p>
            For syndication requests, licensing, or legal notifications, contact{" "}
            <a href="mailto:legal@everygyan.com" className="text-[#C7102E] font-semibold hover:underline">
              legal@everygyan.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
