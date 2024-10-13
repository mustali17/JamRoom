import { PricingCard } from "@/components/PricingCard";

const PricingPage = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price="₹999/-"
            features={[
              "720p streaming quality",
              "Up to 4 hours of streaming per day",
              "Basic analytics",
              "Standard support",
            ]}
          />
          <PricingCard
            title="Pro"
            price="₹1999/-"
            features={[
              "1080p streaming quality",
              "Unlimited streaming",
              "Advanced analytics",
              "Priority support",
              "Custom overlays",
            ]}
            highlighted={true}
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            features={[
              "4K streaming quality",
              "Unlimited streaming",
              "Advanced analytics with API access",
              "24/7 dedicated support",
              "Custom features development",
            ]}
          />
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
