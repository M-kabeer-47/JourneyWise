import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getSessionCookie } from "better-auth/cookies";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Pathname", pathname);
  // Define public paths that don't need authentication

  console.log("Pathname", pathname);
  // For protected paths, check authentication
  try {
    let session = await getSessionCookie(req);
    if (!session && pathname !== "/login") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    } else if (session && pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
}

// Configure which paths this middleware runs on
export const config = {
  matcher: [
    "/api/publish-blog",
    "/api/update-blog/:path",
    "/api/delete-blog/:path",
    "/api/get-user-blogs/:path",
    "/api/create-booking/:path",
    "/api/get-user-bookings/:path",
    "/api/create-experience/:path",
    "/api/update-experience/:path",
    "/api/get-saved-posts/:path",
    "/api/save-post/:path",
    "/api/unsave-post/:path",
    "/api/create-trip/:path",
    "/api/delete-trip/:path",
    "/api/get-user-trips/:path",
    "/dashboard/:path",
    "/create-experience/:path",
    "/blog",
    "/blog/:edit/:id",
    "/plan-trip/:path",
    "/profile",
    "/settings",
    "/login",
  ],
};
