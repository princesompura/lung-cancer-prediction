import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const StepperProgress = ({ steps, currentStep }) => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index <= currentStep
                  ? "border-teal-500 bg-teal-500 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: index <= currentStep ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.div>
          ))}
        </div>
      </div>
      <Progress
        value={(currentStep + 1) / steps.length * 100}
        className="mt-3 h-2 bg-teal-100"
      />
    </>
  );
};

export default StepperProgress;