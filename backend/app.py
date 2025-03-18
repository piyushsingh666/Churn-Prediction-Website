from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

model = joblib.load("model/churn_predict_model.joblib")

geography_mapping = {"France": [0, 0], "Spain": [0, 1], "Germany": [1, 0]} 
gender_mapping = {"Male": 1, "Female": 0}  

@app.route("/api/PredictChurnView/", methods=["POST"])
def predict_churn():
    try:
        data = request.json

        geography_values = geography_mapping.get(data["geography"], [0, 0])
        gender_value = gender_mapping.get(data["gender"], 0)

        input_features = np.array([
            [
                data["credit_score"], data["age"], data["tenure"], data["balance"],
                data["num_of_products"], int(data["has_cr_card"]), int(data["is_active_member"]),
                data["estimated_salary"], *geography_values, gender_value
            ]
        ])

        print("Input Features:", input_features)
        print("Shape of Input:", input_features.shape)

        prediction = model.predict(input_features)[0]
        print("Prediction Output:", prediction)

        return jsonify({"churn_prediction": bool(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
