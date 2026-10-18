import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { setSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const envEmail = (process.env.ADMIN_EMAIL || "admin@everygyan.com").toLowerCase();
    const envPass = process.env.ADMIN_PASSWORD || "AdminPassword123!";

    let valid = false;
    let loggedUser: any = null;

    // Check against DB first
    try {
      const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          valid = true;
          loggedUser = {
            id: user.id,
            name: user.name || (user.role === "ADMIN" ? "Administrator" : "Reader"),
            email: user.email,
            role: user.role || "USER",
          };
        }
      }
    } catch (dbErr) {
      console.warn("DB login lookup skipped or error:", dbErr);
    }

    // Fallback to environment admin credentials
    if (!valid) {
      if (cleanEmail === envEmail && password === envPass) {
        valid = true;
        loggedUser = {
          id: 1,
          name: "Administrator",
          email: envEmail,
          role: "ADMIN",
        };
      }
    }

    if (!valid || !loggedUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await setSession(loggedUser);

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
      user: loggedUser,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Login error" },
      { status: 500 }
    );
  }
}
