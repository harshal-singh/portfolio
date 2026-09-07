import { auth } from "@/auth";
import { NextResponse } from "next/server";

const ALLOWED_EXACT = new Set(["/"]);
const ALLOWED_PREFIXES = ["/admin", "/api", "/_next"];

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isAdminLogin = pathname === "/admin/login";

  if (pathname.startsWith("/admin")) {
    if (!isAdminLogin && !isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
    if (isAdminLogin && isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (
    !ALLOWED_EXACT.has(pathname) &&
    !ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) &&
    !/\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
