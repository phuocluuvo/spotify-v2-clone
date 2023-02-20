import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  //token exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl;
  //Allow the request if the flowing is true
  // token exists
  if (pathname.includes("/api/auth/") || token) {
    console.log(pathname, origin, token);
    return NextResponse.next();
  }

  // no token
  else if (!token && pathname !== "/login") {
    console.log(new URL("/login", req.nextUrl));
    return NextResponse.redirect("/login", req.nextUrl);
  }

  // token
  else if (token && pathname === "/login") {
    console.log(pathname, origin, token);
    return NextResponse.rewrite(`${origin}/`);
  }
}

export const config = {
  matcher: ["/login/:path*", "/api/auth/:path*"],
};
