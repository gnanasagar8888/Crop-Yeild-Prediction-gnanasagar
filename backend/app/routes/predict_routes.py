import token

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
from datetime import datetime
import pandas as pd
import joblib
from fastapi import Header
from app.auth import verify_token

from app.database import predictions_collection

router = APIRouter(prefix="/prediction", tags=["Prediction"])

# ==========================
# Load Model Files
# ==========================
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

model = joblib.load(MODEL_DIR / "yield_model.pkl")
scaler = joblib.load(MODEL_DIR / "scaler.pkl")
label_encoders = joblib.load(MODEL_DIR / "label_encoders.pkl")

print("Crop encoder classes:")
print(label_encoders["crop"].classes_[:10])


# ==========================
# Request Schema
# ==========================
class PredictionRequest(BaseModel):
    crop: str
    season: str
    state: str

    area: float
    fertilizer: float
    pesticide: float

    avg_temp_c: float
    total_rainfall_mm: float
    avg_humidity_percent: float

    N: float
    P: float
    K: float
    pH: float


# ==========================
# Dropdown Options
# ==========================
@router.get("/options")
def get_prediction_options():
    return {
        "crops": sorted(label_encoders["crop"].classes_.tolist()),
        "seasons": sorted(label_encoders["season"].classes_.tolist()),
        "states": sorted(label_encoders["state"].classes_.tolist()),
    }


# ==========================
# Prediction Route
# ==========================
@router.post("/")
def predict(
    data: PredictionRequest,
    authorization: str = Header(...)
):

    try:
        token = authorization.replace("Bearer ", "")
        payload = verify_token(token)

        username = payload["sub"]
        # Convert request to DataFrame
        df = pd.DataFrame([data.model_dump()])

        # Encode categorical columns
        for col in ["crop", "season", "state"]:
            df[col] = label_encoders[col].transform(df[col])

        # Scale numeric columns
        numeric_cols = [
            "area",
            "fertilizer",
            "pesticide",
            "avg_temp_c",
            "total_rainfall_mm",
            "avg_humidity_percent",
            "N",
            "P",
            "K",
            "pH",
        ]

        df[numeric_cols] = scaler.transform(df[numeric_cols])

        # Match training feature order
        df = df[
            [
                "crop",
                "season",
                "state",
                "area",
                "fertilizer",
                "pesticide",
                "avg_temp_c",
                "total_rainfall_mm",
                "avg_humidity_percent",
                "N",
                "P",
                "K",
                "pH",
            ]
        ]

        # Predict
        prediction = round(float(model.predict(df)[0]), 2)

        # Save prediction to MongoDB
        prediction_data = {
            "username": username,   # Temporary (JWT will replace this later)
            "crop": data.crop,
            "season": data.season,
            "state": data.state,
            "area": data.area,
            "fertilizer": data.fertilizer,
            "pesticide": data.pesticide,
            "avg_temp_c": data.avg_temp_c,
            "total_rainfall_mm": data.total_rainfall_mm,
            "avg_humidity_percent": data.avg_humidity_percent,
            "N": data.N,
            "P": data.P,
            "K": data.K,
            "pH": data.pH,
            "predicted_yield": prediction,
            "created_at": datetime.utcnow(),
        }

        result = predictions_collection.insert_one(prediction_data)

        print("Prediction saved successfully!")
        print("Inserted ID:", result.inserted_id)
        return {
            "success": True,
            "predicted_yield": prediction,
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )