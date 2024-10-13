"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGuitar } from "react-icons/fa";

export function Appbar() {
  const { data: session } = useSession();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaGuitar className="text-white text-2xl" />
          <span className="text-white text-xl font-bold">JamRoom</span>
        </div>
        <div>
          {session?.user ? (
            <button
              onClick={() => signOut()}
              className="text-sm font-semibold px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold px-4 py-2 rounded-full text-indigo-600 bg-white hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
