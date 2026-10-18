"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      // Notify UserNav and listeners of authentication change
      window.dispatchEvent(new Event("auth-changed"));

      // Successfully registered and logged in -> redirect to profile or home
      router.push("/profile?new=true");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-lg p-7 sm:p-9 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF0F2] text-[#C7102E] mb-1">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 font-serif">
            Join Every<span className="text-[#C7102E]">Gyan</span>
          </h1>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Create your account to personalize your reading feed, save bookmarks, and participate in discussions
          </p>
        </div>

        {/* Benefits list */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[11px] text-gray-600 space-y-1.5">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C7102E] shrink-0" />
            <span>Curated tech, travel, learning and market briefings</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C7102E] shrink-0" />
            <span>Direct access to author analyses and deep-dive specials</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E] focus:ring-1 focus:ring-[#C7102E] transition"
                placeholder="Devansh Sharma"
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E] focus:ring-1 focus:ring-[#C7102E] transition"
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E] focus:ring-1 focus:ring-[#C7102E] transition"
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E] focus:ring-1 focus:ring-[#C7102E] transition"
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-sm mt-2"
          >
            <span>{loading ? "Creating Account..." : "Create Free Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Login */}
        <div className="pt-4 border-t border-gray-100 text-center space-y-3">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#C7102E] hover:underline"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
            <span>By registering, you agree to EveryGyan Terms & Privacy</span>
          </p>
        </div>

      </div>
    </div>
  );
}
