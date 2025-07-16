import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log("🔒 Middleware triggered for:", req.nextUrl.pathname);
    console.log("🔑 Token exists:", !!req.nextauth.token);

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthenticated = !!token;
        const pathname = req.nextUrl.pathname;

        console.log(`🛡️ Authorization check for ${pathname}:`, isAuthenticated);

        // Allow access to login page without authentication
        if (pathname === "/login") {
          return true;
        }

        // Require authentication for protected routes
        return isAuthenticated;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    "/taskmanagement/:path*",
    "/product/:path*",
    "/thegioididong/:path*",
    "/",
  ],
};
