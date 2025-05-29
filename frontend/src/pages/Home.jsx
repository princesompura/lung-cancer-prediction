import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import { useState } from "react";

function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        Lung Cancer Survival Prediction
      </h1>
      <PredictionForm setPrediction={setPrediction} setError={setError} />
      <PredictionResult prediction={prediction} error={error} />
    </div>
  );
}

export default Home;