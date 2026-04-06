import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  console.log("All Cookies:", allCookies.map(c => c.name)); 
  
  const sessionCookie = getSessionCookie(request);
  console.log("Session Cookie found:", !!sessionCookie);
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/rooms") ||
    request.nextUrl.pathname === "/";

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/rooms/:path*", "/auth"],
};
