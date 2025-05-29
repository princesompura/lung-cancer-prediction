const PredictionResult = ({ prediction, error }) => {
  if (!prediction && !error) return null;

  return (
    <div className="mt-6 text-center">
      {prediction && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Prediction Result</h2>
          <p className={`text-lg mt-2 ${prediction === "Survived" ? "text-green-600" : "text-red-600"}`}>
            {prediction}
          </p>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Error</h2>
          <p className="text-lg text-red-600 mt-2">{error}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionResult;