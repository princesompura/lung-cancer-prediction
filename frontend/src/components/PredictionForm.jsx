import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import StepperProgress from "./StepperProgress";
import StepContent from "./StepContent";
import NavigationButtons from "./NavigationButtons";
import { User, Heart, Activity, Calendar } from "lucide-react";

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
    if (currentStep === steps.length - 1) {
      return formData.diagnosis_date !== "" && formData.end_treatment_date !== "";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Card className="relative w-full bg-white/95 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-teal-100">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-400/20 opacity-50 animate-pulse" />
      <CardHeader className="relative z-10 border-b border-teal-100/50">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-teal-600" />
          {steps[currentStep].title}
        </CardTitle>
        <StepperProgress steps={steps} currentStep={currentStep} />
      </CardHeader>
      <CardContent className="relative z-10 pt-6">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          <StepContent
            steps={steps}
            currentStep={currentStep}
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
          <NavigationButtons
            steps={steps}
            currentStep={currentStep}
            handleBack={handleBack}
            handleNext={handleNext}
            isLoading={isLoading}
            validateFinalStep={validateFinalStep}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;