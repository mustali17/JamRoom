import { StepCard } from "./StepsCard";

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-purple-800">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold mb-12 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Create Your Stream"
            description="Set up your live stream with just a few clicks. Choose your settings and get ready to go live."
          />
          <StepCard
            number="2"
            title="Engage Your Audience"
            description="Interact with your fans in real-time. They can request songs and influence your playlist."
          />
          <StepCard
            number="3"
            title="Grow Your Community"
            description="Build a loyal following as you stream regularly and create unique experiences for your audience."
          />
        </div>
      </div>
    </section>
  );
};
