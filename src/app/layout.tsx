import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import TrendingTicker from "@/components/layout/TrendingTicker";
import FeedFilterBar from "@/components/layout/FeedFilterBar";
import Footer from "@/components/layout/Footer";
import { getCategoriesWithSubs, getInTheNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "EveryGyan — Journalism • Knowledge • Global Perspectives",
  description:
    "EveryGyan is an editorial publication covering deep tech, travel guides, personal learning, and breaking world perspectives.",
  keywords: ["tech", "travel", "learning", "blog", "EveryGyan", "journalism", "news"],
  openGraph: {
    title: "EveryGyan — Journalism • Knowledge • Global Perspectives",
    description: "An editorial publication covering deep tech, travel guides, and personal learning.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategoriesWithSubs();
  const inTheNewsItems = await getInTheNews();

  return (
    <html lang="en">
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
