import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/index";
import ratelimit from "@/libs/ratelimit";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  if (!ratelimit(ip)) {
    return NextResponse.json({ message: "Too many request!" }, { status: 429 });
  }
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("Email already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
