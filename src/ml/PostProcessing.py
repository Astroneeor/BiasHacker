#Imports
import os
from dotenv import load_dotenv
import openai
import json 

#Loading API key
load_dotenv()
api_key = os.getenv("OPEN_AI_KEY")
openai.api_key = api_key

def postProcessing(userInput):
    GPTPrompt=[{
        "role": "system", 
        "content": 
        f""" Your task is to take the notes here {userInput} and read them. These notes are the common biases that the doctors have to keep in mind to MITIGATE (so write it like dont do this etc.). 
        Your main task is to expand on the notes that you are getting about the biases. If you think that the biases are too vague or irrelevant, make up a couple on your own and write about that. I need a good misconception!!!
        You have to explain each one and make them into ACTUAL notes for someone like a doctor to read and keep in mind when they are diagnosing a patient. That they should NOT do the same thing the notes are saying. 
        Explain it in like a single paragraph (3-5 sentences max). GIve me just the text of the notes (nothing in front like Notes for healthcare: etc.). 
        """
        }]
    
    GPTPrompt.append({"role": "user", "content": userInput})
    explainedNotes= openai.chat.completions.create(model="gpt-4o-mini",messages=GPTPrompt)
    explainedNotes= explainedNotes.choices[0].message.content
    print(explainedNotes)
    return explainedNotes

def exportJson(bias):

    data = ""

    notes = postProcessing(bias)

    with open("input.json", "r") as read_file:
        data = json.load(read_file)
    
    data["biases"] = notes

    with open("output.json", "w") as write_file:
        json.dump(data, write_file, indent=4)
    
