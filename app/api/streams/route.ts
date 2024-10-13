import { prismaClient } from "@/lib/db";
import { YT_REGEX } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-expect-error "Type Missing"
import youtubesearchapi from "youtube-search-api";
const StreamSchema = z.object({
  creatorId: z.string().uuid(),
  url: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();
    const streamData = StreamSchema.parse(body);

    if (!streamData.url.trim()) {
      return NextResponse.json(
        {
          message: "YouTube link cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    const isYt = streamData.url.match(YT_REGEX);
    if (!isYt) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 411 });
    }

    const extractedId = streamData.url.split("?v=")[1];
    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );
    const stream = await prismaClient.stream.create({
      data: {
        userId: streamData.creatorId,
        url: streamData.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can't find video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      },
    });

    return NextResponse.json(stream, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Failed to create stream" },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
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
    if (!creatorId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const [streams, activeStream] = await Promise.all([
      await prismaClient.stream.findMany({
        where: { userId: creatorId, played: false },
        include: {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: {
            where: {
              userId: user.id,
            },
          },
        },
      }),
      prismaClient.currentStream.findFirst({
        where: {
          userId: creatorId,
        },
        include: {
          stream: true,
        },
      }),
    ]);

    return NextResponse.json({
      streams: streams.map(({ _count, ...rest }) => ({
        ...rest,
        upvotesCount: _count.upvotes,
        haveUpVoted: rest.upvotes.length ? true : false,
      })),
      activeStream,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch streams" },
      { status: 500 }
    );
  }
}
