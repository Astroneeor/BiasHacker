import PreProcessing
import PostProcessing
from predict import predict_bias
import json

def getJson():
    pass

def sendJson():
    pass

def main(receivedJson):

    age = 0
    gender = ""
    ethnicity = ""
    symptomCategory = ""

    with open("input.json", "w") as write_file:
        json.dump(receivedJson, write_file, indent=4)
        print("Input json written!")
    
    PreProcessing.changeFile()

    with open("preProcessed.json", "r") as read_file:
        data = json.load(read_file)
        age = data.get("age", "")
        gender = data.get("gender", "")
        ethnicity = data.get("ethnicity", "")
        symptomCategory = data.get("symptom_category", "")

    bias = predict_bias(age, gender, ethnicity, symptomCategory)

    print(bias)
    PostProcessing.exportJson(bias)

data = {
    "key": 9815728965891273,
    "age": 24,
    "gender": "Other",
    "ethnicity": "Black",
    "symptom_category": "I have been having difficulty breathing and fever since last few days. I also have a sore throat and a runny nose.",
  }

main(data)








    

