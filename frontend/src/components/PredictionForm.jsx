import { useState } from "react";
import axios from "axios";

const PredictionForm = ({ setPrediction, setError }) => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cholesterol Level</label>
          <input
            type="number"
            name="cholesterol_level"
            value={formData.cholesterol_level}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cancer Stage</label>
          <select
            name="cancer_stage"
            value={formData.cancer_stage}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Stage I">Stage I</option>
            <option value="Stage II">Stage II</option>
            <option value="Stage III">Stage III</option>
            <option value="Stage IV">Stage IV</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Family History</label>
          <select
            name="family_history"
            value={formData.family_history}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Smoking Status</label>
          <select
            name="smoking_status"
            value={formData.smoking_status}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Passive Smoker">Passive Smoker</option>
            <option value="Former Smoker">Former Smoker</option>
            <option value="Never Smoked">Never Smoked</option>
            <option value="Current Smoker">Current Smoker</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hypertension</label>
          <select
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Asthma</label>
          <select
            name="asthma"
            value={formData.asthma}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cirrhosis</label>
          <select
            name="cirrhosis"
            value={formData.cirrhosis}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Other Cancer</label>
          <select
            name="other_cancer"
            value={formData.other_cancer}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Treatment Type</label>
          <select
            name="treatment_type"
            value={formData.treatment_type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Chemotherapy">Chemotherapy</option>
            <option value="Surgery">Surgery</option>
            <option value="Combined">Combined</option>
            <option value="Radiation">Radiation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Diagnosis Date</label>
          <input
            type="date"
            name="diagnosis_date"
            value={formData.diagnosis_date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Treatment Date</label>
          <input
            type="date"
            name="end_treatment_date"
            value={formData.end_treatment_date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700"
      >
        Predict
      </button>
    </form>
  );
};

export default PredictionForm;