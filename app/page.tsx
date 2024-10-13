import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <main>
        {/* Hero Section */}
        <HeroSection session={session!} />

        {/* How it Works Section */}
        <HowItWorks />

        {/* Features Section */}
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Home;
