from app.firebase import firebase_config # from app.firebase import firebase_config
from fastapi import FastAPI
from app.routes.admin_routes import router as admin_router
from app.routes.researcher_routes import router as researcher_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict_routes import router as prediction_router
from app.routes.auth_routes import router
from app.routes.predict_routes import router as predict_router
from app.routes.history_routes import router as history_router

app = FastAPI(
    title="SmartYield API"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(predict_router)
app.include_router(admin_router)
app.include_router(researcher_router)
app.include_router(history_router)


@app.get("/")
def home():
    return {
        "message": "SmartYield Backend Running"
    }
