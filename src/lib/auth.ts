import { cookies } from "next/headers";

export interface SessionUser {
  id?: number;
  email: string;
  name: string;
  role: string; // "ADMIN" | "USER" | "SUPERADMIN"
}

const USER_SESSION_COOKIE = "eg_user_session";
const ADMIN_SESSION_COOKIE = "eg_admin_session";

/**
 * Set an authenticated session cookie for any user or admin
 */
export async function setSession(user: SessionUser) {
  const cookieStore = await cookies();
  const sessionPayload = JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name || (user.role === "ADMIN" ? "Administrator" : "Reader"),
    role: user.role || "USER",
    authenticated: true,
  });

  // Set universal user session
  cookieStore.set(USER_SESSION_COOKIE, sessionPayload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // If the user is an admin, also set the legacy admin session cookie for compatibility
  if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } else {
    // Ensure non-admin doesn't have an admin session
    cookieStore.delete(ADMIN_SESSION_COOKIE);
  }
}

/**
 * Clear all session cookies
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE);
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

/**
 * Get the current session user (supports both eg_user_session and eg_admin_session)
 */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  
  // Try main user session cookie first
  const userSession = cookieStore.get(USER_SESSION_COOKIE);
  if (userSession?.value) {
    try {
      const data = JSON.parse(userSession.value);
      if (data && data.email) {
        return {
          id: data.id,
          email: data.email,
          name: data.name || (data.role === "ADMIN" ? "Administrator" : "Reader"),
          role: data.role || "USER",
        };
      }
    } catch {}
  }

  // Fallback check for legacy eg_admin_session cookie
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE);
  if (adminSession?.value) {
    try {
      const data = JSON.parse(adminSession.value);
      if (data && data.email) {
        return {
          id: data.id || 1,
          email: data.email,
          name: data.name || "Administrator",
          role: data.role || "ADMIN",
        };
      }
    } catch {}
  }

  return null;
}

// Backwards-compatible legacy exports
export async function setAdminSession(email: string) {
  return setSession({
    id: 1,
    email,
    name: "Administrator",
    role: "ADMIN",
  });
}

export async function clearAdminSession() {
  return clearSession();
}

export async function getAdminSession() {
  const session = await getSession();
  if (session && (session.role === "ADMIN" || session.role === "SUPERADMIN")) {
    return session;
  }
  return null;
}
