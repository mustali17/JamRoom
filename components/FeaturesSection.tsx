import { Mic2, Music, Play, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold mb-12 text-center">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Play />}
            title="Live Streaming"
            description="Stream your content live to your audience"
          />
          <FeatureCard
            icon={<Music />}
            title="Fan-Picked Music"
            description="Let fans choose songs for your playlist"
          />
          <FeatureCard
            icon={<Users />}
            title="Community Building"
            description="Engage with your audience in real-time"
          />
          <FeatureCard
            icon={<Mic2 />}
            title="Creator Tools"
            description="Powerful tools to enhance your streams"
          />
        </div>
      </div>
    </section>
  );
};
