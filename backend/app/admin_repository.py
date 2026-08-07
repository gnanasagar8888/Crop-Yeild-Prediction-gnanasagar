from bson import ObjectId

from app.database import (
    users_collection,
    predictions_collection,
)


# ==========================
# USERS
# ==========================

def get_all_users():

    users = list(users_collection.find())

    for user in users:
        user["_id"] = str(user["_id"])
        user.pop("password", None)

    return users


def get_user_by_id(user_id: str):

    user = users_collection.find_one(
        {"_id": ObjectId(user_id)}
    )

    if user:
        user["_id"] = str(user["_id"])
        user.pop("password", None)

    return user


def update_user(user_id: str, data: dict):

    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": data},
    )

    return result.modified_count


def delete_user(user_id: str):

    result = users_collection.delete_one(
        {"_id": ObjectId(user_id)}
    )

    return result.deleted_count


# ==========================
# PREDICTIONS
# ==========================

def get_all_predictions():

    predictions = list(
        predictions_collection.find().sort(
            "created_at",
            -1,
        )
    )

    for prediction in predictions:
        prediction["_id"] = str(
            prediction["_id"]
        )

    return predictions


def delete_prediction(prediction_id: str):

    result = predictions_collection.delete_one(
        {"_id": ObjectId(prediction_id)}
    )

    return result.deleted_count