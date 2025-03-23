#Imports
import os
from dotenv import load_dotenv
import openai
import json 

#Loading API key
load_dotenv()
api_key = os.getenv("OPEN_AI_KEY")
openai.api_key = api_key

with open("input.json", "r") as read_file:
    data = json.load(read_file)

symptomsText = data[0].get("Problems/Symptoms", "")


def preProcessing(userInput):
    GPTPrompt=[{
        "role": "system", 
        "content": 
        f"""
        Your job is to take this text {userInput} and read it. 
        YOUR MAIN TASK IS TO PROCESS INFORMATION ABOUT SYMPTOMS/PROBLEM PART AND BASED ON THE TEXT GIVEN WHICH WOULD EXPLAIN WHAT KIND OF PROBLEM THE PERSON IS HAVING, CLASSIFY IT INTO ONE OF THESE 10 CATEGORIES:
        1. Respiratory Issues
            Cough, shortness of breath, wheezing, asthma, chest tightness.

        2. Cardiac Symptoms
            Chest pain, palpitations, dizziness, fainting, high blood pressure.

        3. Gastrointestinal Problems
            Nausea, vomiting, diarrhea, constipation, stomach pain.

        4. Musculoskeletal Pain
            Joint pain, muscle aches, back pain, limb discomfort, mobility issues.

        5. Neurological Symptoms
            Headache, numbness, tingling, seizures, memory loss, confusion.

        6. Mental Health
            Anxiety, depression, panic attacks, mood swings, insomnia.

        7. Dermatological Conditions
            Rashes, itching, acne, swelling, skin irritation.

        8. Genitourinary Symptoms
            Urinary pain, frequency, discharge, menstrual issues, reproductive pain.

        9. Infectious Signs
            Fever, chills, sore throat, flu-like symptoms, night sweats.

        10. General Malaise
            Fatigue, weakness, weight changes, appetite loss, body aches.

        Just give me back the 2 word text and nothing else. 
        """
        }]
    
    GPTPrompt.append({"role": "user", "content": userInput})
    AnalysisAI= openai.chat.completions.create(model="gpt-4o-mini",messages=GPTPrompt)
    AnalysisAI= AnalysisAI.choices[0].message.content
    print(AnalysisAI)
    return AnalysisAI

problem = preProcessing(symptomsText)

data[0]["Problems/Symptoms"] = problem

with open("input.json", "w") as write_file:
    json.dump(data, write_file, indent=4)