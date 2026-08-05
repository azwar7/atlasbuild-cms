import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ADMIN_ROUTES = ["/dashboard"];
const PROTECTED_PORTAL_ROUTES = ["/portal"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("atlasbuild_session")?.value;

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  const isAdminRoute = PROTECTED_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPortalRoute = PROTECTED_PORTAL_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if ((isAdminRoute || isPortalRoute) && !sessionCookie) {
    // Session check hook
  }

  return response;
}

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
