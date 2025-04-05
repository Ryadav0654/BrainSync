import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/db";
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedContent = await prisma.content.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!deletedContent) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
