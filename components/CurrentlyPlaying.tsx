"use client";
import { useStream } from "@/hooks/useStream";
import { Slider } from "@radix-ui/react-slider";
import { Music2, Pause, Play, Plus, SkipForward } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export const CurrentlyPlaying = ({
  creatorId,
  isCreator,
}: {
  creatorId: string;
  isCreator: boolean;
}) => {
  const { songs, currentSong, setCurrentSong, setSongs } = useStream();
  const [isPlaying, setIsPlaying] = useState(false);
  const [newSongLink, setNewSongLink] = useState("");
  const [progress, setProgress] = useState(0);

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = async () => {
    if (songs.length > 0) {
      const result = await fetch("/api/streams/next", {
        method: "GET",
      });
      const data = await result.json();
      setCurrentSong(data.stream);
      setSongs((q) => q.filter((x) => x.id !== data.stream.id));
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleAddSong = async (e: FormEvent) => {
    e.preventDefault();
    const result = await fetch("/api/streams", {
      method: "POST",
      body: JSON.stringify({
        creatorId: creatorId,
        url: newSongLink,
      }),
    });
    console.log("Song added:", result);
    setNewSongLink("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Currently Playing Section */}
      <Card className="md:col-span-2 bg-white/10 backdrop-blur-lg border-none shadow-lg overflow-hidden">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-2xl font-bold text-violet-300">
            Now Playing
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {currentSong ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={currentSong.bigImg}
                  alt={currentSong.title}
                  width={120}
                  height={90}
                  className="rounded-lg shadow-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-xl text-violet-200">
                    {currentSong.title}
                  </h3>
                </div>

                {/* Conditionally render action buttons if the user is the creator */}
                {isCreator && (
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      className="bg-violet-600 hover:bg-violet-700"
                      onClick={playPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      className="bg-violet-600 hover:bg-violet-700"
                      onClick={playNext}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={(value) => setProgress(value[0])}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-violet-300">
              <Music2 className="h-16 w-16 mb-4" />
              <p className="text-lg">No song playing</p>

              {/* Conditionally render Play Next button if the user is the creator */}
              {isCreator && (
                <Button
                  className="mt-4 bg-violet-600 hover:bg-violet-700"
                  onClick={playNext}
                >
                  Play Next Song
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Song Form */}
      <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-2xl font-bold text-violet-300">
            Add a Song
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleAddSong} className="space-y-4">
            <Input
              type="text"
              placeholder="Paste YouTube or Spotify link"
              value={newSongLink}
              onChange={(e) => setNewSongLink(e.target.value)}
              className="w-full bg-white/20 border-violet-400/50 text-white placeholder:text-violet-300 focus:border-violet-500 focus:ring-violet-500"
            />
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Add to Queue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
