import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { setAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const envEmail = process.env.ADMIN_EMAIL || "admin@everygyan.com";
    const envPass = process.env.ADMIN_PASSWORD || "AdminPassword123!";

    // Check against DB first if available, or fallback to environment credentials
    let valid = false;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        valid = await bcrypt.compare(password, user.password);
      }
    } catch {
      // DB not connected, check env directly
    }

    if (!valid) {
      if (email === envEmail && password === envPass) {
        valid = true;
      }
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await setAdminSession(email);
    return NextResponse.json({ success: true, message: "Logged in successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login error" }, { status: 500 });
  }
}
