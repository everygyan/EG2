import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getSession, setSession } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to update your profile." },
        { status: 401 }
      );
    }

    const { name, currentPassword, newPassword } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.email },
      });

      if (!user) {
        // Fallback for env admin
        const updatedSession = { ...session, name: cleanName };
        await setSession(updatedSession);
        return NextResponse.json({
          success: true,
          message: "Profile updated successfully",
          user: updatedSession,
        });
      }

      const updateData: any = { name: cleanName };

      if (newPassword) {
        if (!currentPassword) {
          return NextResponse.json(
            { error: "Current password is required to set a new password." },
            { status: 400 }
          );
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return NextResponse.json(
            { error: "Current password is incorrect." },
            { status: 400 }
          );
        }

        if (newPassword.length < 6) {
          return NextResponse.json(
            { error: "New password must be at least 6 characters long." },
            { status: 400 }
          );
        }

        updateData.password = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      const newSession = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      };

      await setSession(newSession);

      return NextResponse.json({
        success: true,
        message: "Profile updated successfully",
        user: newSession,
      });
    } catch (dbErr: any) {
      console.error("Profile update error:", dbErr);
      return NextResponse.json(
        { error: "Database error updating profile" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
