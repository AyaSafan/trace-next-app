/**
 * This middleware uses NextAuth's `withAuth` helper to protect routes in a Next.js application.
 * 
 * How it works:
 * - The `withAuth` function wraps a middleware function, automatically injecting the user's authentication token (if present) into the request.
 * - The middleware function logs the current request path and the user's authentication token to the console.
 * - The `authorized` callback determines if a user is allowed to access the route: it returns `true` if a valid token exists (i.e., the user is authenticated), otherwise `false`.
 * - If the user is not authenticated, they will be redirected to the sign-in page (as configured in your NextAuth options).
 * 
 * The `config.matcher` array specifies which routes this middleware should apply to:
 * - It matches all routes except those starting with `/api`, `/_next/static`, `/_next/image`, `/favicon.ico`, or `/auth`.
 * - This ensures that authentication is required for all application pages except for API routes, static/image files, the favicon, and authentication pages themselves.
 */

import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // Log the current request path
    console.log(req.nextUrl.pathname)
    // Log the user's authentication token (if any)
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      // Only allow access if the user has a valid token (is authenticated)
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
} 