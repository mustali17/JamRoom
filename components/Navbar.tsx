"use client";
import { LogIn, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = ({ session }: { session: Session }) => {
  const handleAuthAction = () => {
    if (session?.user) {
      signOut();
    } else {
      signIn("google");
    }
  };

  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-purple-300">JamRoom</h1>
      </Link>
      <nav className="flex items-center">
        <ul className="flex space-x-4 mr-6">
          <li>
            <Link href="/" className="hover:text-purple-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/features"
              className="hover:text-purple-300 transition-colors"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="hover:text-purple-300 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-purple-300 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
        <Button
          onClick={handleAuthAction}
          className="text-white bg-violet-600 hover:bg-violet-700"
        >
          {session?.user ? (
            <>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-2" />
              SignIn
            </>
          )}
        </Button>
      </nav>
    </header>
  );
};
