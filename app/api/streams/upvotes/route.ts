import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const UpvoteSchema = z.object({
  userId: z.string().uuid(),
  streamId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const upvoteData = UpvoteSchema.parse(body);

    const { userId, streamId } = upvoteData;

    const existingUpvote = await prismaClient.upvote.findUnique({
      where: {
        userId_streamId: { userId, streamId },
      },
    });

    if (existingUpvote) {
      // Cancel the upvote
      await prismaClient.upvote.delete({
        where: { id: existingUpvote.id },
      });
      return NextResponse.json({ message: "Upvote removed" }, { status: 200 });
    } else {
      // Add an upvote
      const upvote = await prismaClient.upvote.create({
        data: upvoteData,
      });
      return NextResponse.json(upvote, { status: 201 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Failed to process upvote" },
        { status: 500 }
      );
    }
  }
}
