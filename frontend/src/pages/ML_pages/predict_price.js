import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictPopup = ({ onClose, onPredict }) => {
  const roomTypes = ["Deluxe", "Suite", "Standard"];
  const seasons = ["Winter", "Summer", "Spring", "Fall"];
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [basePriceError, setBasePriceError] = useState("");


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
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Add backdrop blur to body when component mounts
    document.body.style.overflow = "hidden";
    
    return () => {
      // Remove backdrop blur when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setBasePriceError("");
  setError("");

  const basePrice = parseFloat(form.Base_Price);
  if (isNaN(basePrice) || basePrice <= 0) {
    setBasePriceError("Base Price must be a positive number.");
    return;
  }

  try {
    const payload = {
      ...form,
      Base_Price: basePrice,
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


  // Sections for form organization
  const renderSectionTitle = (title) => (
    <h3 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-1 mb-2">{title}</h3>
  );

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

                 {name === "Base_Price" && basePriceError && (
      <p className="text-red-500 text-sm mt-1">{basePriceError}</p>
    )}
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

          <p className="text-gray-600 text-sm mb-3">
            Enter details for AI price prediction
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Details Section */}
            {renderSectionTitle("Basic Details")}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Base_Price" className="block mb-1 text-xs font-medium text-gray-700">Base Price (LKR)</label>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500 text-xs">₨</span>
                  <input
                    id="Base_Price"
                    name="Base_Price"
                    type="number"
                    value={form.Base_Price}
                    onChange={handleChange}
                    className="w-full border pl-6 pr-2 py-1 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="Year" className="block mb-1 text-xs font-medium text-gray-700">Year</label>
                <input
                  id="Year"
                  name="Year"
                  type="number"
                  min="2020"
                  max="2030"
                  value={form.Year}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Room Details Section */}
            {renderSectionTitle("Room Details")}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Room_Type" className="block mb-1 text-xs font-medium text-gray-700">Room Type</label>
                <div className="relative">
                  <select
                    id="Room_Type"
                    name="Room_Type"
                    value={form.Room_Type}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 pr-8 rounded appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    required
                  >
                    <option value="">Select Type</option>
                    {roomTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="No_of_Guests" className="block mb-1 text-xs font-medium text-gray-700">Number of Guests</label>
                <input
                  id="No_of_Guests"
                  name="No_of_Guests"
                  type="number"
                  min="1"
                  max="10"
                  value={form.No_of_Guests}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Time Details Section */}
            {renderSectionTitle("Time Details")}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="Season" className="block mb-1 text-xs font-medium text-gray-700">Season</label>
                <div className="relative">
                  <select
                    id="Season"
                    name="Season"
                    value={form.Season}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 pr-8 rounded appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    required
                  >
                    <option value="">Select</option>
                    {seasons.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="Month" className="block mb-1 text-xs font-medium text-gray-700">Month</label>
                <div className="relative">
                  <select
                    id="Month"
                    name="Month"
                    value={form.Month}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 pr-8 rounded appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    required
                  >
                    <option value="">Select</option>
                    {months.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="Weekday" className="block mb-1 text-xs font-medium text-gray-700">Weekday</label>
                <div className="relative">
                  <select
                    id="Weekday"
                    name="Weekday"
                    value={form.Weekday}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 pr-8 rounded appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    required
                  >
                    <option value="">Select</option>
                    {weekdays.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-2 rounded text-xs">
                {error}
              </div>
            )}

            {showConfetti && (
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-sm font-bold text-green-600">
                  Prediction successful! 
                </div>
                <div className="text-xs text-green-500">
                  Redirecting you now...
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`px-4 py-1 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </>
                ) : (
                  <>
                    Calculate Price
                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictPopup;