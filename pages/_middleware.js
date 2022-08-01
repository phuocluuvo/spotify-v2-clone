import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  //token exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl;

  //Allow the request if the flowing is true
  // token exists
  if (pathname.startsWith("/api/auth") || token) {
    return NextResponse.next();
  }

  // no token
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }

  // token
  if (token && pathname == "/login") {
    return NextResponse.rewrite(`${origin}/`);
  }
}
