import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EveryGyan's editorial privacy policy, data protection standards, and reader privacy practices.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link href="/" className="text-gray-500 hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#C7102E] font-semibold">Privacy Policy</span>
      </div>

      {/* Header */}
      <div className="border-b-2 border-[#C7102E] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C7102E] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>EveryGyan Trust &amp; Security</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-serif">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">
          Last revised: October 18, 2026 &bull; Effective immediately for all EveryGyan readers and subscribers
        </p>
      </div>

      {/* Content */}
      <div className="prose max-w-none text-[#333333] text-sm leading-relaxed space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C7102E]" />
            <span>1. Our Editorial Commitment to Reader Privacy</span>
          </h2>
          <p>
            At EveryGyan, we believe thoughtful journalism and technical knowledge sharing must respect reader privacy.
            We do not sell, rent, or monetize your personal identifying data to third-party data brokers. This policy outlines
            what minimal data we collect, how it is used to deliver dispatches, and how you retain complete control over your profile.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#C7102E]" />
            <span>2. Information We Collect</span>
          </h2>
          <p>
            We collect only the essential information required to provide our publishing platform and membership services:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Account Details:</strong> When you register for an EveryGyan reader or author profile, we store your name, email address, encrypted password hash, and optional bio/avatar.</li>
            <li><strong>Newsletter Subscriptions:</strong> Your verified email address is stored securely to deliver requested weekly editions and breaking news digests.</li>
            <li><strong>Aggregated Telemetry:</strong> Anonymous page visit counts, reading times, and device viewports to optimize responsive layout rendering and server caching.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C7102E]" />
            <span>3. Cookies &amp; Local Storage</span>
          </h2>
          <p>
            We use secure HTTP-only cookies and browser local storage strictly for session authentication, dark/light theme preferences,
            and font sizing persistence. We do not employ third-party cross-site behavioral tracking beacons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111] font-serif">
            4. Reader Rights (GDPR &amp; CCPA Compliance)
          </h2>
          <p>
            Regardless of your geographic location, EveryGyan affords all registered members the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>Inspect and export all personal data associated with your reader profile.</li>
            <li>Request instantaneous account deletion and purge of all saved bookmarks.</li>
            <li>Unsubscribe with a single click from any EveryGyan newsletter dispatch.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-bold text-[#111111]">
            Contact Our Privacy Desk
          </h2>
          <p>
            For privacy inquiries, data deletion requests, or editorial questions, reach our compliance team directly at{" "}
            <a href="mailto:privacy@everygyan.com" className="text-[#C7102E] font-semibold hover:underline">
              privacy@everygyan.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
