from flask import Flask, request, jsonify
import PreProcessing
import PostProcessing
from predict import predict_bias
import json

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        receivedJson = request.get_json()

        # Save the input to a file (optional, based on your original code)
        with open("input.json", "w") as write_file:
            json.dump(receivedJson, write_file, indent=4)
            print("Input json written!")

        # Preprocess
        PreProcessing.changeFile()

        with open("preProcessed.json", "r") as read_file:
            data = json.load(read_file)
            age = data.get("age", "")
            gender = data.get("gender", "")
            ethnicity = data.get("ethnicity", "")
            symptomCategory = data.get("symptom_category", "")

        # Predict
        bias = predict_bias(age, gender, ethnicity, symptomCategory)

        # Optionally write output
        PostProcessing.exportJson(bias)

        return jsonify({"bias_prediction": bias}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)