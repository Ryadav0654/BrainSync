import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    return NextResponse.json({ token });
}