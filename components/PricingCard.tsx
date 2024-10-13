import { Check } from "lucide-react";

export const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}> = ({ title, price, features, highlighted = false }) => {
  return (
    <div
      className={`p-6 rounded-lg text-center ${
        highlighted ? "bg-purple-600" : "bg-white bg-opacity-10"
      }`}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold mb-6">
        {price}
        <span className="text-sm">/month</span>
      </p>
      <ul className="text-left mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <Check className="mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 px-4 rounded-full transition-colors ${
          highlighted
            ? "bg-white text-purple-600 hover:bg-gray-200"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        Choose Plan
      </button>
    </div>
  );
};
