import { FeatureCard } from "@/components/FeatureCard";
import {
  BarChart,
  HeartHandshake,
  Mic2,
  Music,
  Play,
  Shield,
  Users,
  Zap,
} from "lucide-react";

const FeaturesPage = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Play />}
            title="Live Streaming"
            description="Stream your content live to your audience with high-quality video and audio."
          />
          <FeatureCard
            icon={<Music />}
            title="Fan-Picked Music"
            description="Allow your fans to choose songs and create collaborative playlists for your stream."
          />
          <FeatureCard
            icon={<Users />}
            title="Community Building"
            description="Engage with your audience through chat, polls, and interactive elements."
          />
          <FeatureCard
            icon={<Mic2 />}
            title="Creator Tools"
            description="Access powerful tools to enhance your streams, including filters, overlays, and sound effects."
          />
          <FeatureCard
            icon={<HeartHandshake />}
            title="Fan Interactions"
            description="Facilitate direct interactions with fans through virtual meet-and-greets and exclusive content."
          />
          <FeatureCard
            icon={<Zap />}
            title="Low Latency"
            description="Experience near real-time interaction with your audience thanks to our low-latency technology."
          />
          <FeatureCard
            icon={<Shield />}
            title="Content Protection"
            description="Protect your intellectual property with our advanced content protection system."
          />
          <FeatureCard
            icon={<BarChart />}
            title="Analytics Dashboard"
            description="Get detailed insights into your audience engagement and stream performance."
          />
        </div>
      </main>
    </>
  );
};

export default FeaturesPage;
