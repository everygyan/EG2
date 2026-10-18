"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Shield,
  Key,
  CheckCircle,
  Save,
  LogOut,
  Calendar,
  Sparkles,
  BookOpen,
  Bell,
  ArrowRight,
} from "lucide-react";

interface SessionUser {
  id?: number;
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit profile form state
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Preferences toggles
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true);
  const [techBriefsSubscribed, setTechBriefsSubscribed] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          setName(data.user.name || "");
        } else {
          router.push("/login?redirect=/profile");
        }
      })
      .catch(() => {
        router.push("/login?redirect=/profile");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (newPassword && newPassword !== confirmPassword) {
      setStatusMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setStatusMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setUser(data.user);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setStatusMsg({ type: "success", text: "Profile details updated successfully!" });
      window.dispatchEvent(new Event("auth-changed"));
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.dispatchEvent(new Event("auth-changed"));
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-xs text-gray-500 py-20">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <span>Loading user profile...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = user.role === "ADMIN" || user.role === "SUPERADMIN";
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Top Profile Header Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C7102E] text-white flex items-center justify-center text-2xl sm:text-3xl font-black font-masthead shadow-md shrink-0">
            {initials}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
                {user.name}
              </h1>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isAdmin
                    ? "bg-red-50 text-[#C7102E] border border-red-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {isAdmin ? "Editorial Administrator" : "Verified Reader"}
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>{user.email}</span>
            </p>
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 pt-0.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Member of EveryGyan Global Editorial Network</span>
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isAdmin && (
            <Link
              href="/admin"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-bold rounded-lg shadow-sm transition"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Quick Access Highlight Box (if admin) */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-red-50 via-white to-gray-50 border border-red-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#C7102E] font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>Editorial CMS Console Access Enabled</span>
            </div>
            <p className="text-xs text-gray-600 max-w-xl">
              You are signed in with an Administrator profile. You have full publishing privileges, category controls, monetization and database controls.
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition shrink-0"
          >
            <span>Open Admin Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Grid: Edit Profile Form + Standard Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Edit Details & Security */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-6">
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#C7102E]" />
                <span>Account Information</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Update your display name or update your secure account password
              </p>
            </div>

            {statusMsg && (
              <div
                className={`p-3 text-xs rounded-lg flex items-center gap-2 ${
                  statusMsg.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E] focus:ring-1 focus:ring-[#C7102E]"
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Primary identifier used for security verification
                </span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-gray-500" />
                  <span>Change Password (Leave blank to keep existing)</span>
                </h3>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password to authorize changes"
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7102E]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C7102E] hover:bg-[#9E0C24] text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving Changes..." : "Save Profile Details"}</span>
                </button>
              </div>

            </form>

          </div>
        </div>

        {/* Right Col: Standard Account Details & Preferences */}
        <div className="space-y-6">
          
          {/* Account Overview Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Security & Status</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Account Type</span>
                <span className="font-semibold text-gray-900">{isAdmin ? "Administrator" : "Standard Reader"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Authentication</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Encrypted (Bcrypt)</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Session Security</span>
                <span className="font-semibold text-gray-900">HTTP-Only / Lax</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Editorial Region</span>
                <span className="font-semibold text-gray-900">Global (EN-IN)</span>
              </div>
            </div>
          </div>

          {/* Reader Preferences & Newsletter Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Bell className="w-4 h-4 text-[#C7102E]" />
              <span>Reader Subscriptions</span>
            </h3>

            <div className="space-y-3.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletterSubscribed}
                  onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  className="mt-0.5 rounded text-[#C7102E] focus:ring-[#C7102E]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-gray-900">Morning Intelligence Brief</p>
                  <p className="text-gray-500 text-[11px]">Daily digest of top news, tech and market shifts</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={techBriefsSubscribed}
                  onChange={(e) => setTechBriefsSubscribed(e.target.checked)}
                  className="mt-0.5 rounded text-[#C7102E] focus:ring-[#C7102E]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-gray-900">DeepTech & Travel Dispatches</p>
                  <p className="text-gray-500 text-[11px]">In-depth articles from editorial columnists</p>
                </div>
              </label>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 border-b border-gray-100 pb-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span>Explore Portals</span>
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              <Link href="/category/tech" className="text-gray-700 hover:text-[#C7102E] font-medium transition">
                &bull; Tech & Innovation
              </Link>
              <Link href="/category/travel" className="text-gray-700 hover:text-[#C7102E] font-medium transition">
                &bull; Travel Guides & Experiences
              </Link>
              <Link href="/category/learning" className="text-gray-700 hover:text-[#C7102E] font-medium transition">
                &bull; Learning & Academic Portal
              </Link>
              <Link href="/feed/plus" className="text-[#C7102E] font-bold transition">
                &bull; EveryGyan + Premium
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
