import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth"; // Ensure this path is correct
import { getServerSession } from "next-auth/next"; // Use 'next-auth/next'
import { prisma } from "@/db";
import * as z from "zod/v4";
import ratelimit from "@/libs/ratelimit";

const addBrainSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characters")
    .refine((val) => val.trim().split(/\s+/).length <= 100, {
      message: "Title should not exceed 100 words",
    }),
  type: z.enum(["Link", "Blog", "Youtube", "Tweet", "Document", "Questions"]),
  link: z.url(),
  tags: z.array(z.string().min(1)).max(5),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!ratelimit(ip)) {
    return NextResponse.json({ message: "Too many request!" }, { status: 429 });
  }
  try {
    const allContents = await prisma.content.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!allContents) {
      return NextResponse.json({ error: "No content found" }, { status: 404 });
    }
    return NextResponse.json({ contents: allContents });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const s = ratelimit(ip);

  if (!s) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const { data, error, success } = await addBrainSchema.safeParseAsync(body);

  if (!success) {
    const formatted = error.flatten();
    return NextResponse.json(
      { message: formatted.fieldErrors },
      { status: 400 }
    );
  }

  try {
    const newContent = await prisma.content.create({
      data: {
        ...data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    if (!newContent) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { data: newContent, message: "Content created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
