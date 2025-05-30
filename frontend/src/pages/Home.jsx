import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import { useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-indigo-50 flex flex-col animate-gradient">
      {/* Hero Section */}
      <header className="p-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-600"
        >
          Lung Cancer Survival Prediction
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-3 text-lg text-gray-700 max-w-md mx-auto"
        >
          Empowering healthcare with AI-driven survival predictions. Step through the form to get started.
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          <PredictionForm
            setPrediction={setPrediction}
            setError={setError}
            setIsLoading={setIsLoading}
            isLoading={isLoading} // Pass isLoading as a prop
          />
        </motion.div>
        <PredictionResult prediction={prediction} error={error} isLoading={isLoading} />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-600 bg-white/80 backdrop-blur-sm">
        <p>© 2025 Lung Cancer Prediction. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;