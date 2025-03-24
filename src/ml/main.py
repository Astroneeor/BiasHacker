from flask import Flask, request, jsonify
import PreProcessing
import PostProcessing
from predict import predict_bias
import json
import requests  # Import requests to send data to the Express server
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Step 1: Get the received JSON data from the request
        receivedJson = request.get_json()

        # Step 2: Save the received input to a file
        with open("input.json", "w") as write_file:
            json.dump(receivedJson, write_file, indent=4)
            print("Input json written!")

        # Step 3: Preprocess the data
        PreProcessing.changeFile()

        # Step 4: Load preprocessed data
        with open("preProcessed.json", "r") as read_file:
            data = json.load(read_file)
            age = data.get("age", "")
            gender = data.get("gender", "")
            ethnicity = data.get("ethnicity", "")
            symptomCategory = data.get("symptom_category", "")

        # Step 5: Run prediction
        bias = predict_bias(age, gender, ethnicity, symptomCategory)

        # Step 6: Optionally write output after prediction
        PostProcessing.exportJson(bias)

        # Step 7: Read the output JSON data
        with open("output.json", "r") as read_file:
            output_data = json.load(read_file)
            print("Output json written!")

        # Step 8: Send the processed data (output_data) to the Express server
        response = requests.post("http://localhost:3000/patientfile", json=output_data)

        # Step 9: Handle the response from the Express server
        if response.status_code == 200:
            print("Patient file saved successfully in the Express server.")
        else:
            print("Error sending data to Express server:", response.status_code, response.text)

        # Step 10: Return a successful response back to the frontend
        return jsonify({"message": "Data processed and sent to Express server successfully."}), 200

    except Exception as e:
        # If an error occurs during the process, return an error response
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
