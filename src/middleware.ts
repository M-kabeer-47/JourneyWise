import {NextRequest, NextResponse} from 'next/server'
import {auth} from "@/lib/auth/auth"
import { getSessionCookie } from 'better-auth'

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    console.log("Pathname",pathname)
    // Define public paths that don't need authentication
    const publicPaths = [
        '/api/(auth)',
        '/api/get-blogs',
        '/api/get-blog',
        '/api/get-experiences',
        '/api/get-experience',
        '/api/get-trip',
        '/api/get-trips',
    ]

    // Check if current path is public
    const isPublicPath = publicPaths.some(path => 
        pathname.startsWith(path.replace('(auth)', '')) || 
        pathname.includes('/(auth)/')
    )

    if (isPublicPath) {
        return NextResponse.next()
    }

    // For protected paths, check authentication
    let session = await getSessionCookie(req)
    if (!session) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    return NextResponse.next()
}

// Configure which paths this middleware runs on
export const config = {
    matcher: [
        '/api/publish-blog/:path',
        '/api/update-blog/:path',
        '/api/delete-blog/:path',
        '/api/get-user-blogs/:path',
        '/api/create-booking/:path',
        '/api/get-user-bookings/:path',
        '/api/create-experience/:path',
        '/api/update-experience/:path',
        '/api/get-saved-posts/:path',
        '/api/save-post/:path',
        '/api/unsave-post/:path',
        '/api/create-trip/:path',
        '/api/delete-trip/:path',
        '/api/get-user-trips/:path',
        '/dashboard/:path',
        '/create-experience/:path',
        '/plan-trip/:path',
        '/profile/:path'
    ]
}