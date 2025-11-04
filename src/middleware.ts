import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getSessionCookie } from "better-auth/cookies";
import { betterFetch } from "@better-fetch/fetch";
import { userSchema } from "./lib/schemas/backend/user";

export default async function middleware(request: NextRequest) {
  type Session = typeof auth.$Infer.Session;
  const { pathname } = request.nextUrl;
  console.log("Pathname", pathname);
  // Define public paths that don't need authentication

  console.log("Pathname", pathname);
  // For protected paths, check authentication
  try {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "", // Forward the cookies from the requestuest
        },
      }
    );

    let isValidUser = userSchema.safeParse(session?.user);
    if (session && isValidUser.error){
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (!session && pathname !== "/login") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    } else if (session && pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      session &&
      pathname !== "/settings" &&
      !session.user?.emailVerified
    ) {
      console.log("Redirecting to verify-email");

      return NextResponse.redirect(new URL("/verify-email", request.url));
    } else if (session?.user && pathname.startsWith("/api/")) {
      const response = NextResponse.next();
      console.log("User ID:", session.user.id);
      response.headers.set("x-user-id", session.user.id);
      return response;
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

// Configure which paths this middleware runs on
export const config = {
  matcher: [
    "/api/publish-blog",
    "/api/update-blog/:path",
    "/api/delete-blog/:path",
    "/api/update-user",
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
    "/api/update-user-preferences",
    "/api/get-user-preferences",
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
