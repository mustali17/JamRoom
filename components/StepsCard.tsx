import { ArrowRight } from "lucide-react";

export const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-purple-700 p-6 rounded-lg text-center relative">
      <div className="absolute top-4 left-4 bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <h4 className="text-2xl font-semibold mb-4 mt-8">{title}</h4>
      <p className="text-purple-200">{description}</p>
      <ArrowRight className="text-purple-400 mt-4 mx-auto" />
    </div>
  );
};
