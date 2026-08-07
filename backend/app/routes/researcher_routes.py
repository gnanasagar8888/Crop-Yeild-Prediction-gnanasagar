from fastapi import APIRouter

from app.researcher_repository import (
    get_dashboard_stats,
    get_prediction_history,
)

router = APIRouter(
    prefix="/researcher",
    tags=["Researcher"],
)


# ==========================
# Dashboard Statistics
# ==========================

@router.get("/dashboard")
def dashboard():

    return get_dashboard_stats()


# ==========================
# Prediction History
# ==========================

@router.get("/predictions")
def predictions():

    return get_prediction_history()