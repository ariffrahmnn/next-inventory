import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  /*
   * Matcher ini akan melindungi semua route request KECUALI:
   * 1. api (API routes)
   * 2. _next/static (static files)
   * 3. _next/image (image optimization files)
   * 4. favicon.ico, sitemap.xml, robots.txt (metadata files)
   * 5. Semua file dengan ekstensi (seperti .png, .jpg, .svg)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"],
};