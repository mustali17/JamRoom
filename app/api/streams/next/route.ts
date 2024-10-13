import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const mostUpVotedStream = await prismaClient.stream.findFirst({
      where: {
        userId: user.id,
        played: false,
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });

    await Promise.all([
      prismaClient.currentStream.upsert({
        where: {
          userId: user.id,
        },
        update: {
          streamId: mostUpVotedStream?.id,
        },
        create: {
          userId: user.id,
          streamId: mostUpVotedStream?.id,
        },
      }),
      prismaClient.stream.update({
        where: {
          id: mostUpVotedStream?.id,
        },
        data: {
          played: true,
        },
      }),
    ]);

    return NextResponse.json({
      stream: mostUpVotedStream,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch streams" },
      { status: 500 }
    );
  }
}
