

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# Load the trained model and encoders
model = joblib.load("../models/model.pkl")
encoders = joblib.load("../models/encoders.pkl")

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change if frontend is hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input structure
class HotelInput(BaseModel):
    Year: int
    Season: str
    Month: str
    Weekday: str
    No_of_Guests: int
    Room_Type: str
    Base_Price: float

# Define the prediction endpoint
@app.post("/predict")
def predict_price(data: HotelInput):
    try:
        # Helper to encode categorical fields
        def encode_feature(col_name, value):
            if col_name not in encoders:
                raise ValueError(f"Encoder for '{col_name}' not found.")
            if str(value) not in encoders[col_name].classes_:
                raise ValueError(f"'{value}' is not a valid value for {col_name}.")
            return encoders[col_name].transform([str(value)])[0]

        # Feature order: same as in training
        input_vector = [
            data.Year,
            encode_feature("Season", data.Season),
            encode_feature("Month", data.Month),
            encode_feature("Weekday", data.Weekday),
            data.No_of_Guests,
            encode_feature("Room_Type", data.Room_Type),
            data.Base_Price
        ]

        prediction = model.predict([input_vector])[0]
        return {"predicted_price_LKR": round(prediction, 2)}

    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}
