"use client";
import { initialSongs, REFRESH_INTERVAL_MS } from "@/constants";
import { createContext, useEffect, useState } from "react";

// Define the Song type
interface Song {
  id: number;
  title: string;
  artist: string;
  thumbnail: string;
  bigImg: string;
  upvotesCount: number;
  hasUpVoted: boolean;
}

// Define the context interface
interface StreamContextType {
  songs: Song[];
  currentSong: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  refetchStreams: () => void;
}

export const StreamContext = createContext<StreamContextType | undefined>(
  undefined
);

interface StreamProviderProps {
  children: React.ReactNode;
  creatorId: string;
}

export const StreamProvider = ({
  children,
  creatorId,
}: StreamProviderProps) => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [currentSong, setCurrentSong] = useState<Song>(initialSongs[0]);

  const refetchStreams = async () => {
    if (!creatorId) return;

    const res = await fetch(`/api/streams?creatorId=${creatorId}`, {
      credentials: "include",
    });
    const data = await res.json();
    setSongs(data?.streams);
    setCurrentSong((song) => {
      // Only update if the current song isn't the active one
      if (song?.id === data?.activeStream?.stream.id) {
        return song;
      }
      return data?.activeStream?.stream;
    });
  };

  useEffect(() => {
    refetchStreams();

    const interval = setInterval(() => {
      refetchStreams();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorId]);

  return (
    <StreamContext.Provider
      value={{ songs, currentSong, setCurrentSong, setSongs, refetchStreams }}
    >
      {children}
    </StreamContext.Provider>
  );
};
