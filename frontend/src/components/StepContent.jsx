// /frontend/src/components/StepContent.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const StepContent = ({ steps, currentStep, formData, handleChange, handleSelectChange }) => {
  const fieldVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: "easeIn" } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-4">
          {steps[currentStep].icon}
          <h3 className="text-lg font-semibold text-gray-700">
            {steps[currentStep].title}
          </h3>
        </div>
        {steps[currentStep].fields.map((field, index) => (
          <motion.div
            key={field.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
          >
            <Label htmlFor={field.name} className="text-gray-700 font-medium">
              {field.label}
            </Label>
            {field.type === "select" ? (
              <Select
                value={formData[field.name]}
                onValueChange={(value) => handleSelectChange(field.name, value)}
              >
                <SelectTrigger className="mt-1 bg-white border-teal-200 focus:ring-teal-400">
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                step={field.step}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="mt-1 bg-white border-teal-200 focus:ring-teal-400"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepContent;