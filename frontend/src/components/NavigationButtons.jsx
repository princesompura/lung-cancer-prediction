import { Button } from "@/components/ui/button";
import { Loader2, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const NavigationButtons = ({
  steps,
  currentStep,
  handleBack,
  handleNext,
  isLoading,
  validateFinalStep,
}) => {
  return (
    <div className="flex justify-between mt-6">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-full px-6 py-2"
        >
          Back
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {currentStep === steps.length - 1 ? (
          <Button
            type="submit"
            disabled={isLoading || !validateFinalStep()}
            className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                Predict Now
                <Stethoscope className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg"
          >
            Next
            <Stethoscope className="ml-2 h-4 w-4" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default NavigationButtons;