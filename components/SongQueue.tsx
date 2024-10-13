"use client";
import { useStream } from "@/hooks/useStream";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export const SongQueue = ({ userId }: { userId: string }) => {
  const { songs, refetchStreams } = useStream();

  const handleUpvote = async (id: number) => {
    const result = await fetch("/api/streams/upvotes", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        streamId: id,
      }),
    });

    console.log("🚀 ~ handleUpvote ~ result:", result);
    refetchStreams();
  };
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
      <CardHeader className="border-b border-white/20">
        <CardTitle className="text-2xl font-bold text-violet-300">
          Up Next
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ScrollArea className="max-h-[300px] w-full pr-4">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center space-x-4 mb-4 bg-white/5 p-4 rounded-lg transition-all hover:bg-white/10"
            >
              <span className="text-2xl font-bold text-violet-400 w-8">
                {index + 1}
              </span>
              <Image
                src={song.bigImg}
                alt={song.title}
                width={60}
                height={45}
                className="rounded-md shadow-sm"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-violet-200">{song.title}</h3>
                {/* <p className="text-sm text-violet-300">{song.artist}</p> */}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-violet-300 font-medium">
                  {song.upvotesCount}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-violet-400 hover:text-violet-200 hover:bg-violet-800/50"
                  onClick={() => handleUpvote(song.id)}
                >
                  {song.hasUpVoted ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
