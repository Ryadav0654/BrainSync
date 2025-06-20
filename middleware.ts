import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const rateLimitMap = new Map<string, { count: number; time: number }>();

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
});

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl.pathname;
//   const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
//   const response = NextResponse.next();

//   if (url.startsWith("/api/auth/session")) {
//     return response;
//   }

//   console.log("ip: ", ip);
//   const { success } = await rateLimit.limit(ip);
//   return success
//     ? response
//     : NextResponse.json(
//         { error: "Too many requests — try again in 5 minutes" },
//         { status: 429 }
//       );
// }

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  if (url.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();

  const entry = rateLimitMap.get(ip) || { count: 0, time: now };

  const fiveMinutes = 5 * 60 * 1000;
  if (now - entry.time < fiveMinutes) {
    if (entry.count >= 5) {
      return NextResponse.json(
        { error: "Too many requests — try again in 5 minutes" },
        { status: 429 }
      );
    }

    entry.count++;
  } else {
    entry.count = 1;
    entry.time = now;
  }

  rateLimitMap.set(ip, entry);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
