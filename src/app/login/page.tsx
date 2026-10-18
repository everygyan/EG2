"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const registered = searchParams.get("registered") === "true";
  const adminRequired = searchParams.get("error") === "admin_required";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    adminRequired ? "Administrator credentials required to access the CMS Console." : ""
  );
  const [successMsg, setSuccessMsg] = useState(
    registered ? "Account created successfully! Please sign in with your credentials." : ""
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      // Notify UserNav and any other listeners
      window.dispatchEvent(new Event("auth-changed"));

      // Determine redirect destination
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (data.user?.role === "ADMIN" || data.user?.role === "SUPERADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
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
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 font-serif">
            Welcome to Every<span className="text-[#C7102E]">Gyan</span>
          </h1>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Sign in to access your reader profile, member features, or editorial management
          </p>
        </div>

        {/* Success message banner */}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <span>✓ {successMsg}</span>
          </div>
        )}

        {/* Error message banner */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E] focus:ring-1 focus:ring-[#C7102E] transition"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-sm mt-2"
          >
            <span>{loading ? "Signing In..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Register */}
        <div className="pt-4 border-t border-gray-100 text-center space-y-3">
          <p className="text-xs text-gray-600">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="font-bold text-[#C7102E] hover:underline"
            >
              Register here
            </Link>
          </p>
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
            <span>Secure 256-bit encrypted authentication</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-xs text-gray-400">Loading sign in portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
