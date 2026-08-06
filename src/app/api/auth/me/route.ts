import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/shared/lib/db";
import { successResponse } from "@/shared/utils/errors";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "atlasbuild_super_secret_fallback_key";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("atlasbuild_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    let decoded: any = null;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const userId = decoded.sub || decoded.id;
    if (!userId) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Attempt database lookup to ensure user exists and get fresh data
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true },
      });
    } catch (e) {
      // Fall back to decoded token payload if DB lookup fails
    }

    const userData = user || {
      id: userId,
      email: decoded.email,
      name: decoded.name || decoded.email?.split("@")[0] || "User",
      role: decoded.role || "ADMIN",
    };

    return successResponse({
      authenticated: true,
      user: userData,
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
