"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, DollarSign, ToggleLeft, ToggleRight, Sparkles, Check } from "lucide-react";

export default function AdminAdsPage() {
  const [adSenseId, setAdSenseId] = useState("ca-pub-XXXXXXXXXXXX");
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/ads")
      .then((r) => r.json())
      .then((d) => {
        if (d.slots) setSlots(d.slots);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (idx: number) => {
    setSlots((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      for (const slot of slots) {
        await fetch("/api/ads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slot),
        });
      }
      setSuccessMsg("Monetization & Ad slots updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Console</span>
        </Link>
        <span className="text-xs text-gray-500 font-mono">
          AdSense & Monetization Suite
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-black text-gray-900 font-serif">
          Monetization & Ad Slot Manager
        </h1>
        <p className="text-xs text-gray-500">
          Configure Google AdSense slots, custom sponsor banners, and affiliate containers across EveryGyan.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Global AdSense Config Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-gray-900">
            Google AdSense Publisher Credentials
          </h3>
        </div>
        <p className="text-xs text-gray-500">
          Once your Google AdSense account is approved, paste your client publisher ID here. Script tags will be automatically injected.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
              Google AdSense Client ID
            </label>
            <input
              type="text"
              value={adSenseId}
              onChange={(e) => setAdSenseId(e.target.value)}
              placeholder="ca-pub-1234567890123456"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:border-[#C7102E]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
              AdSense Auto-Ads Status
            </label>
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Enabled & Zero-CLS Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slots List */}
      <form onSubmit={handleSaveAll} className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
          <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Available Modular Ad Placements</h3>
            <span className="text-xs text-gray-500">{slots.length} active slots</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-gray-400">Loading ad slots...</div>
          ) : (
            <div className="p-5 divide-y divide-gray-100 space-y-4">
              {slots.map((slot, idx) => (
                <div key={slot.slotKey} className="pt-4 first:pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{slot.title}</h4>
                      <span className="text-[10px] font-mono text-gray-400">
                        Identifier: #{slot.slotKey} &bull; Placement: {slot.placement || "General"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggle(idx)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer"
                    >
                      {slot.isActive ? (
                        <>
                          <span className="text-emerald-600">Active</span>
                          <ToggleRight className="w-6 h-6 text-emerald-600" />
                        </>
                      ) : (
                        <>
                          <span className="text-gray-400">Disabled</span>
                          <ToggleLeft className="w-6 h-6 text-gray-400" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">
                        Destination Link / Affiliate URL
                      </label>
                      <input
                        type="text"
                        value={slot.targetUrl || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSlots((prev) =>
                            prev.map((s, i) => (i === idx ? { ...s, targetUrl: val } : s))
                          );
                        }}
                        placeholder="/plans or https://affiliate.example.com/ref"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C7102E]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-semibold mb-1">
                        Custom HTML / AdSense Snippet (Optional)
                      </label>
                      <input
                        type="text"
                        value={slot.adCode || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSlots((prev) =>
                            prev.map((s, i) => (i === idx ? { ...s, adCode: val } : s))
                          );
                        }}
                        placeholder="<!-- Google AdSense ad unit code -->"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:border-[#C7102E]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white px-6 py-2.5 rounded text-xs font-bold transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Ad Settings"}</span>
          </button>
        </div>
      </form>

    </div>
  );
}
