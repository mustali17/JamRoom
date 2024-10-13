"use client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { GetStartedModal } from "./GetStartedModal";
import { Button } from "./ui/button";

export const HeroSection: React.FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  console.log("🚀 ~ session:", session);
  return (
    <section className="py-20 md:py-32 text-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Connect with Your Fans Through Music
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          Let your audience choose the soundtrack to your stream and create
          unforgettable moments together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {session?.user ? (
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
            >
              Get Started
            </Button>
          ) : (
            <GetStartedModal />
          )}
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-purple-800 opacity-20 z-0"></div>
    </section>
  );
};
