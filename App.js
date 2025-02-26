import React, { useState } from "react";
import axios from "axios";

const DiagnosticAssistant = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { symptoms });
      setDiagnosis(response.data.diagnosis);
    } catch (error) {
      console.error("Error fetching diagnosis", error);
      setDiagnosis("Error: Unable to fetch diagnosis");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">AI Diagnostic Assistant</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <label className="block mb-2 font-medium">Enter Symptoms:</label>
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="e.g., fever, cough, headache"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Get Diagnosis"}
        </button>
      </form>
      {diagnosis && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold">Diagnosis:</h2>
          <p className="text-gray-700">{diagnosis}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticAssistant;
