"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send, CheckCircle2, MapPin, Globe, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    desk: "editorial",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link href="/" className="text-gray-500 hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#C7102E] font-semibold">Contact Desk</span>
      </div>

      {/* Header */}
      <div className="border-b-2 border-[#C7102E] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C7102E] uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>EveryGyan Newsroom &bull; Connect With Us</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-serif">
          Contact Editorial Desk
        </h1>
        <p className="text-xs text-gray-500">
          Have a news tip, technical submission, guest essay, or partnership proposal? Reach our editorial team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 font-serif">
                Dispatch Received!
              </h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Thank you for reaching out, {formData.name}. Our editorial team reviews incoming submissions daily and will respond to{" "}
                <span className="font-semibold">{formData.email}</span> within 24 to 48 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", desk: "editorial", subject: "", message: "" });
                }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 transition"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Devansh Sharma"
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="devansh@example.com"
                    className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Target Editorial Desk
                </label>
                <select
                  value={formData.desk}
                  onChange={(e) => setFormData({ ...formData, desk: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E] bg-white"
                >
                  <option value="editorial">Tech &amp; AI Engineering Desk</option>
                  <option value="travel">Travel Diaries &amp; Field Expeditions</option>
                  <option value="personal-blog">Personal Essays &amp; Book Reviews</option>
                  <option value="health">Health &amp; Longevity Science</option>
                  <option value="partnerships">Syndication &amp; Media Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Article tip / Feedback on recent deep dive"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Message or Story Pitch *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details, context, code repositories, or travel itinerary drafts..."
                  className="w-full text-xs p-3 border border-gray-300 rounded focus:outline-none focus:border-[#C7102E] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to EveryGyan Desk</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Desk Directory */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C7102E]" />
              <span>Direct Inboxes</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-semibold text-gray-800">Editor-in-Chief</div>
                <a href="mailto:editor@everygyan.com" className="text-[#C7102E] hover:underline">
                  editor@everygyan.com
                </a>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Tech &amp; AI Submissions</div>
                <a href="mailto:tech@everygyan.com" className="text-[#C7102E] hover:underline">
                  tech@everygyan.com
                </a>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Travel Memoirs &amp; Itineraries</div>
                <a href="mailto:travel@everygyan.com" className="text-[#C7102E] hover:underline">
                  travel@everygyan.com
                </a>
              </div>
              <div>
                <div className="font-semibold text-gray-800">General Support</div>
                <a href="mailto:support@everygyan.com" className="text-[#C7102E] hover:underline">
                  support@everygyan.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3 text-xs text-gray-600">
            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-gray-900">Digital Publishing Hub</div>
                <div>Global operations &bull; Continuous editorial cycle</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-gray-900">Headquarters</div>
                <div>EveryGyan Media &bull; New Delhi &bull; Singapore</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
