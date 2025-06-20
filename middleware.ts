import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(6, "60 s"),
  analytics: true,
});

const allowedOrigins = ["chrome-extension://*"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // const isAllowedOrigin = allowedOrigins.includes(origin);
  const isAllowedOrigin = origin.startsWith("chrome-extension://");

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  const { success } = await rateLimit.limit(ip);

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return success
    ? response
    : NextResponse.json(
        { error: "Too many requests — try again in 1 minutes" },
        { status: 429 }
      );
}

export const config = {
  matcher: "/api/:path*",
};
