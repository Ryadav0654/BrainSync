import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth"; // Ensure this path is correct
import { getServerSession } from "next-auth/next"; // Use 'next-auth/next'
import { prisma } from "@/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, title, link } = body;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newContent = await prisma.content.create({
      data: {
        title: title,
        type: type,
        link: link,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      }
    });

    if (!newContent) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Content created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
