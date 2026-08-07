from fastapi import APIRouter
from app.database import predictions_collection

router = APIRouter(prefix="/history", tags=["History"])


@router.get("/")
def get_history():

    history = list(
        predictions_collection.find(
            {},
            {"_id": 0}
        ).sort("created_at", -1)
    )

    return history