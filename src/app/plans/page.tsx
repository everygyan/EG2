import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import RightSidebar from "@/components/magazine/RightSidebar";

export default function PlansPage() {
  const plans = [
    {
      name: "Reader Standard",
      price: "Free",
      period: "Forever",
      desc: "Full access to standard dispatches, daily news, and public portals.",
      features: [
        "Full access to standard articles",
        "Community discussions & comments",
        "Weekly newsletter digest",
        "Public travel and learning guides",
      ],
      isPopular: false,
      cta: "Current Plan",
      ctaClass: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    },
    {
      name: "EveryGyan +",
      price: "₹499",
      period: "/ month",
      desc: "Ad-free journalism, exclusive investigative reports, and code repositories.",
      features: [
        "100% Ad-Free reading experience",
        "Exclusive EveryGyan+ Dispatches",
        "Early access to travel itineraries & maps",
        "Full source code downloads for tech tutorials",
        "Direct Q&A with editorial correspondents",
      ],
      isPopular: true,
      cta: "Get EveryGyan +",
      ctaClass: "bg-[#C7102E] hover:bg-[#9E0C24] text-white",
    },
    {
      name: "Institutional & Pro",
      price: "₹1,499",
      period: "/ quarter",
      desc: "Team licenses, research PDF downloads, and commercial licensing.",
      features: [
        "All EveryGyan+ features for up to 5 seats",
        "Export dispatches as formatted PDFs",
        "Commercial rights for coding tutorials",
        "Priority support desk",
      ],
      isPopular: false,
      cta: "Contact Enterprise",
      ctaClass: "bg-gray-900 hover:bg-black text-white",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-2">
      <div className="flex-1 min-w-0 max-w-[850px] space-y-6">
        
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {/* Header */}
        <div className="border-b-2 border-[#C7102E] pb-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#C7102E] bg-[#FFF0F2] px-2.5 py-0.5 rounded">
              MEMBERSHIP TIERS
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] font-serif">
            EveryGyan Digital Access Plans
          </h1>
          <p className="text-xs text-gray-600">
            Support independent journalism, in-depth travel research, and cutting-edge tech education.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-lg border flex flex-col justify-between space-y-5 bg-white ${
                p.isPopular
                  ? "border-[#C7102E] ring-1 ring-[#C7102E] shadow-sm relative"
                  : "border-gray-200 shadow-2xs"
              }`}
            >
              {p.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C7102E] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Most Popular
                </span>
              )}

              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{p.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">{p.desc}</p>
                </div>

                <div className="pt-2">
                  <span className="text-2xl font-black text-gray-900">{p.price}</span>
                  <span className="text-xs text-gray-500 font-medium"> {p.period}</span>
                </div>

                <ul className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-2 px-3 text-xs font-bold rounded transition text-center ${p.ctaClass}`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

      </div>

      <RightSidebar />
    </div>
  );
}
