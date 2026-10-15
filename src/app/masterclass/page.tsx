"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Calendar, Users, Award, ShieldCheck } from "lucide-react";
import RightSidebar from "@/components/magazine/RightSidebar";

export default function MasterclassPage() {
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

        {/* Masterclass Header */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#C7102E] text-white rounded font-bold text-xs flex items-center justify-center">
              EG
            </span>
            <span className="text-xs font-black uppercase text-[#111111]">
              THE YOUNG LEADERS &bull; STUDY SMART MASTERCLASS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-serif leading-tight">
            Give Your Child the Smarter Way to Learn: Advanced Cognitive & Practical Skills
          </h1>

          <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop"
              alt="Masterclass"
              fill
              className="object-cover"
              sizes="800px"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-[#C7102E]" />
              <span>Starts: 21st November</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Live Interactive Cohort</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Certified Curriculum</span>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 font-serif">Curriculum Modules</h2>
          
          <div className="space-y-3 text-xs text-gray-700">
            <div className="p-3 bg-gray-50 rounded flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-gray-900 block">Critical Thinking & First-Principles Problem Solving</strong>
                Deconstructing complex mathematical and logical challenges into intuitive components.
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-gray-900 block">Modern AI Literacy & Safe Tool Usage</strong>
                Teaching students how to ethically leverage AI for research, coding, and creative projects.
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-gray-900 block">Effective Communication & Public Presentation</strong>
                Building confidence in articulating structured arguments and conveying research findings.
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-gray-400 block uppercase">Tuition Fee</span>
              <div className="text-2xl font-black text-gray-900">
                ₹14,999 <span className="text-xs font-normal text-gray-500">/ All inclusive</span>
              </div>
            </div>

            <button
              onClick={() => alert("Registration inquiry received. Our admissions counselor will contact you shortly!")}
              className="w-full sm:w-auto px-6 py-3 bg-[#1E2E5D] hover:bg-[#162347] text-white font-bold text-xs rounded transition flex items-center justify-center gap-2 shadow"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enroll Student Today</span>
            </button>
          </div>
        </div>

      </div>

      <RightSidebar />
    </div>
  );
}
