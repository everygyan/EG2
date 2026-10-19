import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import TrendingTicker from "@/components/layout/TrendingTicker";
import FeedFilterBar from "@/components/layout/FeedFilterBar";
import Footer from "@/components/layout/Footer";
import { getCategoriesWithSubs, getInTheNews } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://everygyan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EveryGyan — Journalism • Knowledge • Global Perspectives",
    template: "%s | EveryGyan",
  },
  description:
    "EveryGyan is an editorial publication covering deep tech, travel guides, personal learning, and breaking world perspectives.",
  keywords: [
    "tech journalism",
    "deep tech",
    "AI engineering",
    "software architecture",
    "travel diaries",
    "personal essays",
    "productivity",
    "health longevity",
    "EveryGyan",
    "global perspectives",
  ],
  authors: [{ name: "EveryGyan Editorial Team", url: siteUrl }],
  creator: "EveryGyan",
  publisher: "EveryGyan Media",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EveryGyan — Journalism • Knowledge • Global Perspectives",
    description:
      "An editorial publication covering deep tech, travel guides, personal essays, and world perspectives.",
    url: siteUrl,
    siteName: "EveryGyan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "EveryGyan — Journalism • Knowledge • Global Perspectives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EveryGyan — Journalism • Knowledge • Global Perspectives",
    description:
      "An editorial publication covering deep tech, travel guides, personal learning, and breaking world perspectives.",
    site: "@everygyan",
    creator: "@everygyan",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategoriesWithSubs();
  const inTheNewsItems = await getInTheNews();

  // JSON-LD Structured Data Schema for WebSite and Blog
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EveryGyan",
    alternateName: "EveryGyan Media",
    url: siteUrl,
    description:
      "EveryGyan is an editorial publication covering deep tech, travel guides, personal learning, and breaking world perspectives.",
    publisher: {
      "@type": "Organization",
      name: "EveryGyan Media",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.svg`,
      },
      sameAs: [
        "https://twitter.com/everygyan",
        "https://instagram.com/everygyan",
        "https://youtube.com/@everygyan",
        "https://linkedin.com/company/everygyan",
        "https://facebook.com/everygyan",
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "EveryGyan Knowledge Hub",
    url: `${siteUrl}/feed/plus`,
    description:
      "Curated engineering tutorials, travel memoirs, and evidence-based wellness dispatches.",
    publisher: {
      "@type": "Organization",
      name: "EveryGyan Media",
      url: siteUrl,
    },
    inLanguage: "en-US",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <Navbar categories={categories} />
        <TrendingTicker items={inTheNewsItems} />
        <FeedFilterBar />
        <div className="flex-1 max-w-[1340px] w-full mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
