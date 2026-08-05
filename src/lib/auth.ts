import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "atlasbuild-secret-key-change-in-production-2026";
export const TOKEN_COOKIE_NAME = "atlasbuild_session";

export interface UserTokenPayload {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "PROJECT_MANAGER" | "CLIENT_EXEC" | "FIELD_ENGINEER";
  name: string;
}

/**
 * Sign a new JWT token for a user
 */
export function signToken(payload: UserTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify an incoming JWT token string
 */
export function verifyToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserTokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Set HTTP-Only, Secure, SameSite cookie with user session token
 */
export async function setSessionCookie(payload: UserTokenPayload) {
  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Retrieve current user session from HTTP cookies
 */
export async function getSession(): Promise<UserTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Clear session cookie for logout
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}
