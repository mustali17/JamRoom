"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const GetStartedModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-purple-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Get Started with MusicStream
          </DialogTitle>
          <DialogDescription className="text-gray-200">
            Join MusicStream to start streaming and connecting with your
            audience!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Button
            onClick={() => signIn("google")}
            className="w-full bg-white text-gray-800 hover:bg-gray-200 font-bold py-3 px-4 rounded-full transition-colors flex items-center justify-center"
          >
            Sign up with Google
          </Button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-300">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  );
};
