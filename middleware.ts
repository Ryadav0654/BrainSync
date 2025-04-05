// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// const rateLimitMap = new Map<string, { count: number; time: number }>();

// export function middleware(req: NextRequest) {
//   const ip = req.headers.get('x-forwarded-for') || "unknown";
//   const now = Date.now();

//   const entry = rateLimitMap.get(ip) || { count: 0, time: now };

//   if (now - entry.time < 60_000) {
//     if (entry.count >= 5) {
//       return new NextResponse("Too many requests", { status: 429 });
//     }

//     entry.count++;
//   } else {
//     entry.count = 1;
//     entry.time = now;
//   }

//   rateLimitMap.set(ip, entry);

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/:path*"], 
// };


// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; time: number }>();

export function middleware(req: NextRequest) {
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
