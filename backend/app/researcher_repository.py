from collections import Counter

from app.database import predictions_collection


def get_dashboard_stats():

    predictions = list(
        predictions_collection.find()
    )

    if not predictions:

        return {
            "total_predictions": 0,
            "average_yield": 0,
            "highest_yield": 0,
            "lowest_yield": 0,
            "top_crop": "-",
            "top_state": "-",
        }

    yields = []
    crops = []
    states = []

    for prediction in predictions:

        try:

            value = float(
                prediction.get(
                    "predicted_yield",
                    0,
                )
            )

            yields.append(value)

        except:

            pass

        crops.append(
            prediction.get("crop", "Unknown")
        )

        states.append(
            prediction.get("state", "Unknown")
        )

    return {

        "total_predictions":
            len(predictions),

        "average_yield":
            round(sum(yields) / len(yields), 2),

        "highest_yield":
            round(max(yields), 2),

        "lowest_yield":
            round(min(yields), 2),

        "top_crop":
            Counter(crops).most_common(1)[0][0],

        "top_state":
            Counter(states).most_common(1)[0][0],

    }


def get_prediction_history():

    history = list(
        predictions_collection.find()
    )

    for prediction in history:

        prediction["_id"] = str(
            prediction["_id"]
        )

    return history