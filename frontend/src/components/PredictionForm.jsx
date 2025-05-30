// /frontend/src/components/PredictionForm.jsx
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Stethoscope, User, Heart, Activity, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PredictionForm = ({ setPrediction, setError, setIsLoading, isLoading }) => {
  const initialFormData = {
    age: "",
    gender: "Male",
    country: "",
    cancer_stage: "Stage I",
    family_history: "Yes",
    smoking_status: "Passive Smoker",
    bmi: "",
    cholesterol_level: "",
    hypertension: "No",
    asthma: "No",
    cirrhosis: "No",
    other_cancer: "No",
    treatment_type: "Chemotherapy",
    diagnosis_date: "",
    end_treatment_date: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Personal Details",
      icon: <User className="h-6 w-6 text-teal-600" />,
      fields: [
        { label: "Age", name: "age", type: "number", placeholder: "e.g., 64" },
        { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
        { label: "Country", name: "country", type: "text", placeholder: "e.g., Sweden" },
        { label: "BMI", name: "bmi", type: "number", step: "0.1", placeholder: "e.g., 29.4" },
      ],
    },
    {
      title: "Medical History",
      icon: <Heart className="h-6 w-6 text-teal-600" />,
      fields: [
        { label: "Family History", name: "family_history", type: "select", options: ["Yes", "No"] },
        {
          label: "Smoking Status",
          name: "smoking_status",
          type: "select",
          options: ["Passive Smoker", "Former Smoker", "Never Smoked", "Current Smoker"],
        },
        { label: "Hypertension", name: "hypertension", type: "select", options: ["Yes", "No"] },
        { label: "Asthma", name: "asthma", type: "select", options: ["Yes", "No"] },
        { label: "Cirrhosis", name: "cirrhosis", type: "select", options: ["Yes", "No"] },
        { label: "Other Cancer", name: "other_cancer", type: "select", options: ["Yes", "No"] },
      ],
    },
    {
      title: "Cancer Details",
      icon: <Activity className="h-6 w-6 text-teal-600" />,
      fields: [
        {
          label: "Cancer Stage",
          name: "cancer_stage",
          type: "select",
          options: ["Stage I", "Stage II", "Stage III", "Stage IV"],
        },
        {
          label: "Treatment Type",
          name: "treatment_type",
          type: "select",
          options: ["Chemotherapy", "Surgery", "Combined", "Radiation"],
        },
        {
          label: "Cholesterol Level",
          name: "cholesterol_level",
          type: "number",
          placeholder: "e.g., 199",
        },
      ],
    },
    {
      title: "Treatment Timeline",
      icon: <Calendar className="h-6 w-6 text-teal-600" />,
      fields: [
        { label: "Diagnosis Date", name: "diagnosis_date", type: "date" },
        { label: "End Treatment Date", name: "end_treatment_date", type: "date" },
      ],
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateFinalStep = () => {
    // Ensure diagnosis_date and end_treatment_date are filled on the final step
    if (currentStep === steps.length - 1) {
      return formData.diagnosis_date !== "" && formData.end_treatment_date !== "";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the final step before proceeding
    if (!validateFinalStep()) {
      setError("Please fill in both Diagnosis Date and End Treatment Date before submitting.");
      return;
    }

    setIsLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await axios.post(
        "https://lung-cancer-prediction-4wxs.onrender.com/predict",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setPrediction(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during prediction");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent form submission on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
    }
  };

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
    <Card className="relative w-full bg-white/95 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-teal-100">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-400/20 opacity-50 animate-pulse" />
      <CardHeader className="relative z-10 border-b border-teal-100/50">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-teal-600" />
          {steps[currentStep].title}
        </CardTitle>
        {/* Stepper Progress */}
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
      </CardHeader>
      <CardContent className="relative z-10 pt-6">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
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
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;