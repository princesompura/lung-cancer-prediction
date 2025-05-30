// /frontend/src/components/PredictionResult.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const PredictionResult = ({ prediction, error, isLoading }) => {
  if (!prediction && !error && !isLoading) return null;

  const resultVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={resultVariants}
      className="w-full max-w-3xl mt-6"
    >
      <Card className="relative bg-white/95 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-teal-100">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-400/20 opacity-50 animate-pulse" />
        <CardHeader className="relative z-10 border-b border-teal-100/50">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {isLoading ? "Prediction in Progress" : error ? "Error" : "Prediction Result"}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 text-center py-6">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          ) : prediction ? (
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`text-2xl font-bold ${
                prediction === "Survived" ? "text-teal-600" : "text-red-600"
              }`}
            >
              {prediction}
            </motion.p>
          ) : (
            <p className="text-lg text-red-600">{error}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictionResult;