import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ADMIN_ROUTES = ["/dashboard"];
const PROTECTED_PORTAL_ROUTES = ["/portal"];

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://maps.googleapis.com;
  connect-src 'self' https://api.cloudinary.com https://maps.googleapis.com https://*.neon.tech;
  media-src 'self' https://res.cloudinary.com;
  frame-src 'none';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  manifest-src 'self';
  worker-src 'self' blob:;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

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

  // Apply Production Security Headers
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self), display-capture=()");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
