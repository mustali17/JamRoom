import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JamRoom - Your Musical Space",
  description: "Connect, collaborate, and create music with JamRoom",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Provider>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white font-sans">
              <Navbar session={session!} />
              {children}
              <Footer />
            </div>
            <Toaster />
        </Provider>
      </body>
    </html>
  );
}
