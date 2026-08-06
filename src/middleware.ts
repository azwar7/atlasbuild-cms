import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSecurityHeaders } from "@/lib/securityHeaders";

const PROTECTED_ADMIN_ROUTES = ["/dashboard"];
const PROTECTED_PORTAL_ROUTES = ["/portal"];
const isDev = process.env.NODE_ENV !== 'production';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("atlasbuild_session")?.value;

  const isAdminRoute = PROTECTED_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPortalRoute = PROTECTED_PORTAL_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  let response: NextResponse;

  if ((isAdminRoute || isPortalRoute) && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    response = NextResponse.redirect(loginUrl);
  } else {
    response = NextResponse.next();
  }

  // Apply Standardized Security Headers
  const headers = getSecurityHeaders({ isDev });
  headers.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });

  return response;
}

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
