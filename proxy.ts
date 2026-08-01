import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;
  const isAdminLogin = pathname === "/admin/login";

  if (pathname.startsWith("/admin") && !isAdminLogin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  if (isAdminLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
