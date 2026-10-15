"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function RightSidebar() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badgeTitle: "THE YOUNG LEADERS",
      subTitle: "STUDY SMART MASTERCLASS",
      heading: "GIVE YOUR CHILD THE SMARTER WAY TO LEARN",
      points: ["Live Online Sessions", "Grades 6-10 & Campus"],
      batchDate: "BATCH STARTS: 21st NOVEMBER",
      price: "₹14,999/-",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop",
      cta: "Register Today!",
      link: "/masterclass",
    },
    {
      badgeTitle: "CODE & AI ACCELERATOR",
      subTitle: "FULL-STACK MENTORSHIP",
      heading: "MASTER MODERN WEB APPS & AI INTEGRATIONS",
      points: ["Hands-on Projects", "Hostinger & Cloud Deployments"],
      batchDate: "BATCH STARTS: 1st DECEMBER",
      price: "₹19,999/-",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
      cta: "Enroll Now!",
      link: "/learning",
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 pt-2 lg:pt-0 lg:pl-5 space-y-6">
      
      {/* Required Standard Ad Label */}
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-wider text-[#999999] font-medium">
          Advertisement
        </span>
      </div>

      {/* Ad Card 1: Subscription Banner */}
      <div className="bg-[#FAFAFC] border border-[#E5E5EB] rounded-lg p-5 text-center shadow-xs">
        <span className="text-[10px] font-bold tracking-widest text-[#C7102E] uppercase block mb-1.5">
          EVERYGYAN+ DIGITAL ACCESS
        </span>
        <h3 className="text-sm font-bold text-[#111111] mb-3 leading-snug">
          Ad-free journalism & exclusive global insights
        </h3>
        <Link
          href="/plans"
          className="inline-block text-xs font-semibold text-[#111111] hover:text-[#C7102E] underline underline-offset-4 transition"
        >
          Explore Plans →
        </Link>
      </div>

      {/* Ad Card 2: Interactive Masterclass / Sponsored Promotion */}
      <div className="border border-[#E5E5EB] rounded-lg p-4 bg-white shadow-xs space-y-3.5">
        
        {/* Header with EG Logo */}
        <div className="flex items-center gap-2 border-b border-[#F0F0F3] pb-2.5">
          <div className="w-6 h-6 bg-[#C7102E] text-white rounded font-bold text-xs flex items-center justify-center">
            EG
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-[#111111] leading-none">
              {currentSlide.badgeTitle}
            </h4>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#666666]">
              {currentSlide.subTitle}
            </span>
          </div>
        </div>

        {/* Content & Thumbnail */}
        <div className="space-y-2">
          <h5 className="text-xs font-black uppercase tracking-tight text-[#111111] leading-tight">
            {currentSlide.heading}
          </h5>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="space-y-1.5 text-[11px] text-[#444444]">
              {currentSlide.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="relative w-16 h-12 rounded overflow-hidden shrink-0 bg-gray-100">
              <Image
                src={currentSlide.image}
                alt="Course"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          </div>
        </div>

        {/* Batch Badge */}
        <div className="bg-[#1C2333] text-white text-[9.5px] font-bold px-2 py-1 rounded-xs tracking-wider uppercase">
          {currentSlide.batchDate}
        </div>

        {/* Action Button & Pricing */}
        <Link
          href={currentSlide.link}
          className="flex items-center justify-between bg-[#1E2E5D] hover:bg-[#162347] text-white px-3 py-2 rounded text-xs font-bold transition group"
        >
          <span>{currentSlide.cta}</span>
          <div className="text-right">
            <span className="text-[9px] font-normal block opacity-80 leading-none">Starting</span>
            <span className="text-[11px] font-bold">{currentSlide.price}</span>
          </div>
        </Link>

        {/* Carousel Pagination & Arrows */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSlide === i ? "bg-[#111111] w-4" : "bg-[#D1D1D6]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-[#666666]">
            <button
              onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
              className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </aside>
  );
}
