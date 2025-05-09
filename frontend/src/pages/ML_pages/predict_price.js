// PredictPopup.js
import React, { useState } from "react";
import axios from "axios";

const PredictPopup = ({ onClose, onPredict }) => {
  const roomTypes = ["Deluxe", "Suite", "Standard"];
  const seasons = ["Winter", "Summer", "Spring", "Fall"];
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [form, setForm] = useState({
    Base_Price: "",
    Year: "",
    Room_Type: "",
    Season: "",
    Month: "",
    Weekday: "",
    No_of_Guests: 1,
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        Base_Price: parseFloat(form.Base_Price),
        Year: parseInt(form.Year),
        No_of_Guests: parseInt(form.No_of_Guests),
      };
      const res = await axios.post("http://localhost:8000/predict", payload);
      setPrediction(res.data.predicted_price_LKR);
      onPredict(res.data.predicted_price_LKR);
      onClose();
    } catch (err) {
      setError("Prediction failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Predict Hotel Room Price</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "Base_Price", label: "Base Price (LKR)", type: "number" },
            { name: "Year", label: "Year", type: "number" },
            { name: "No_of_Guests", label: "Number of Guests", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
          ))}

          {[
            { name: "Room_Type", label: "Room Type", options: roomTypes },
            { name: "Season", label: "Season", options: seasons },
            { name: "Month", label: "Month", options: months },
            { name: "Weekday", label: "Weekday", options: weekdays },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
              <select
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              >
                <option value="">-- Select {label} --</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <div className="flex justify-end mt-4 gap-2">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Predict</button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PredictPopup;
