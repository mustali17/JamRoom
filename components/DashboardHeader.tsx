"use client";
import { toast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

export const DashboardHeader = ({userId}:{userId:string}) => {
  const handleShare = () => {
    const roomLink = `https://localhost:3000/creator/${userId}`;
    navigator.clipboard.writeText(roomLink).then(() => {
      toast({
        title: "Link Copied!",
        description:
          "Share this link with your friends to invite them to your room.",
      });
    });
  };
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 pb-2">
        JamRoom Dashboard
      </h1>
      <Button
        onClick={handleShare}
        className="bg-violet-600 hover:bg-violet-700 text-white"
      >
        <Share2 className="h-4 w-4 mr-2" /> Share Room
      </Button>
    </div>
  );
};
