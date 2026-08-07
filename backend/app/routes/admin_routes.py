from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.database import (
    users_collection,
    predictions_collection,
)

from app.admin_repository import (
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user,
    get_all_predictions,
    delete_prediction,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

# ======================================
# Dashboard Statistics
# ======================================

@router.get("/stats")
def get_stats():

    return {
        "farmers": users_collection.count_documents(
            {"role": "farmer"}
        ),
        "researchers": users_collection.count_documents(
            {"role": "researcher"}
        ),
        "admins": users_collection.count_documents(
            {"role": "admin"}
        ),
        "predictions": predictions_collection.count_documents(
            {}
        ),
        "system": "Online",
    }


# ======================================
# USERS
# ======================================

@router.get("/users")
def get_users():

    return get_all_users()


@router.get("/users/{user_id}")
def get_user(user_id: str):

    user = get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user


class UpdateUser(BaseModel):
    username: str
    email: str
    role: str


@router.put("/users/{user_id}")
def edit_user(
    user_id: str,
    user: UpdateUser,
):

    updated = update_user(
        user_id,
        user.model_dump(),
    )

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "message": "User updated successfully"
    }


@router.delete("/users/{user_id}")
def remove_user(user_id: str):

    deleted = delete_user(user_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "message": "User deleted successfully"
    }


# ======================================
# PREDICTIONS
# ======================================

@router.get("/predictions")
def get_predictions():

    return get_all_predictions()


@router.delete("/predictions/{prediction_id}")
def remove_prediction(
    prediction_id: str,
):

    deleted = delete_prediction(
        prediction_id
    )

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return {
        "message": "Prediction deleted successfully"
    }