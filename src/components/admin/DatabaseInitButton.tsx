"use client";

import { useState } from "react";
import { Database, Check, RefreshCw } from "lucide-react";

export default function DatabaseInitButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleInit = async () => {
    if (!confirm("This will create all MySQL tables and seed starter categories and articles into Hostinger. Continue?")) {
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/setup-db?key=AdminPassword123!");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize database");
      }

      setStatus("Database initialized successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      alert(`Database initialization failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleInit}
      disabled={loading}
      className="flex items-center gap-1.5 border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3.5 py-2 rounded text-xs font-semibold transition cursor-pointer disabled:opacity-50"
      title="Create MySQL tables and seed starter content directly on Hostinger"
    >
      {loading ? (
        <>
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
          <span>Setting up Database...</span>
        </>
      ) : status ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-700" />
          <span>{status}</span>
        </>
      ) : (
        <>
          <Database className="w-3.5 h-3.5 text-emerald-700" />
          <span>Sync & Seed Database</span>
        </>
      )}
    </button>
  );
}
