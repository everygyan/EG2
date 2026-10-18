"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Shield, ChevronDown, UserPlus, LogIn } from "lucide-react";

interface SessionUser {
  id?: number;
  name: string;
  email: string;
  role: string;
}

export default function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();

    // Listen for custom login/logout events across tabs or components
    const handleAuthChange = () => fetchSession();
    window.addEventListener("auth-changed", handleAuthChange);
    return () => window.removeEventListener("auth-changed", handleAuthChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setIsOpen(false);
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return (
      <div className="h-8 w-28 bg-gray-100 animate-pulse rounded-full" />
    );
  }

  // Unauthenticated: Show Sign In / Register
  if (!user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#C7102E] transition rounded hover:bg-gray-50"
        >
          <LogIn className="w-3.5 h-3.5 text-gray-500" />
          <span>Sign In</span>
        </Link>
        <span className="text-gray-300 text-xs hidden sm:inline">|</span>
        <Link
          href="/register"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#C7102E] hover:bg-[#9E0C24] transition rounded shadow-2xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register</span>
        </Link>
      </div>
    );
  }

  // Authenticated: Show User Name + Avatar + Dropdown
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
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button: User's Name with Initial Circle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition shadow-2xs group focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 rounded-full bg-[#C7102E] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
          {initials}
        </div>
        <span className="text-xs font-bold text-gray-800 max-w-[110px] sm:max-w-[140px] truncate group-hover:text-[#C7102E] transition-colors">
          {user.name}
        </span>
        {isAdmin && (
          <span className="hidden sm:inline-block text-[9px] font-extrabold uppercase bg-red-100 text-[#C7102E] px-1.5 py-0.5 rounded tracking-wider">
            Admin
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* User Info Header */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
            <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isAdmin
                    ? "bg-red-50 text-[#C7102E] border border-red-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {isAdmin ? "Editorial Administrator" : "Verified Reader"}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-[#FFF5F6] hover:text-[#C7102E] transition font-medium"
            >
              <User className="w-4 h-4 text-gray-400 group-hover:text-[#C7102E]" />
              <span>View Profile</span>
            </Link>

            {/* Admin / Author Dashboard option - shown for Admin users */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#C7102E] hover:bg-[#FFF0F2] transition"
              >
                <Shield className="w-4 h-4 text-[#C7102E]" />
                <div className="flex flex-col">
                  <span>Author Dashboard</span>
                  <span className="text-[10px] font-normal text-gray-500">
                    CMS, Posts &amp; Settings
                  </span>
                </div>
              </Link>
            )}

            <div className="my-1 border-t border-gray-100" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition text-left font-medium"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
