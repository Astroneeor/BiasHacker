from transformers import T5Tokenizer, T5ForConditionalGeneration
from difflib import SequenceMatcher, get_close_matches

# Load model and tokenizer
model = T5ForConditionalGeneration.from_pretrained("./bias_model")
tokenizer = T5Tokenizer.from_pretrained("./bias_model")

# Input alias mapping
SYMPTOM_INPUT_ALIASES = {
    "Musculoskeletal": "Musculoskeletal Pain",
    "Cardiac": "Cardiac Symptoms",
    "Respiratory": "Respiratory Issues",
    "Neurological": "Neurological Symptoms",
    "Gastrointestinal": "Gastrointestinal Problems",
    "Mental": "Mental Health",
    "Skin": "Dermatological Conditions",
    "Dermatological": "Dermatological Conditions",
    "Urinary": "Genitourinary Symptoms",
    "Infection": "Infectious Signs",
    "Fatigue": "General Malaise"
}

# Symptom keyword mappings
SYMPTOM_KEYWORDS = {
    "Respiratory Issues": ["respiratory", "cough", "asthma", "breath", "wheezing", "pulmonary"],
    "Cardiac Symptoms": ["chest", "heart", "cardiac", "palpitations", "attack"],
    "Neurological Symptoms": ["headache", "seizure", "dizziness", "stroke", "neurological", "confusion", "numbness"],
    "Gastrointestinal Problems": ["stomach", "nausea", "abdominal", "bloating", "gi", "digestive"],
    "Mental Health": ["depression", "anxiety", "mental", "psychiatric", "emotional", "suicidal"],
    "Musculoskeletal Pain": ["joint", "muscle", "pain", "stiffness", "arthritis", "back"],
    "Dermatological Conditions": ["rash", "skin", "lesion", "itching", "dermatological", "eczema"],
    "Genitourinary Symptoms": ["urinary", "genital", "frequent urination", "bladder", "uti", "painful urination"],
    "Infectious Signs": ["fever", "infection", "chills", "sweats", "sepsis", "contagious"],
    "General Malaise": ["fatigue", "weakness", "malaise", "tiredness", "lethargy", "low energy"]
}

# 🔍 Correct minor typos in symptom category
def correct_symptom_input(symptom_category):
    all_keys = list(SYMPTOM_INPUT_ALIASES.keys()) + list(SYMPTOM_INPUT_ALIASES.values())
    matches = get_close_matches(symptom_category, all_keys, n=1, cutoff=0.7)
    return matches[0] if matches else symptom_category

# ✅ Relevance checker
def is_prediction_relevant(prediction, symptom_category):
    symptom_words = SYMPTOM_KEYWORDS.get(symptom_category, [])
    prediction = prediction.lower()
    return any(word in prediction or SequenceMatcher(None, word, prediction).ratio() > 0.65 for word in symptom_words)

# 🚫 Hallucination checker
def looks_like_hallucination(text):
    suspicious_tokens = [
        "ein", "süd", "jahr", "alt", "patienten", "süd-asian", "jähriger", "alter", "un-", "eine"
    ]
    text = text.lower()
    return any(token in text for token in suspicious_tokens)

# 📊 Rank predictions by quality
def rank_predictions(predictions, symptom_category):
    ranked = []
    for p in predictions:
        hallucinated = looks_like_hallucination(p)
        relevant = is_prediction_relevant(p, symptom_category)
        score = int(relevant) * 2 + int(not hallucinated)  # Relevant & not hallucinated = 3
        ranked.append((score, p.strip()))
    return sorted(ranked, key=lambda x: -x[0])  # Descending score

# 🧠 Main prediction function
def predict_bias(age, gender, ethnicity, symptom_category, allow_fallback=True, verbose=False):
    # Fuzzy-correct and normalize category
    symptom_category = correct_symptom_input(symptom_category)
    symptom_category = SYMPTOM_INPUT_ALIASES.get(symptom_category, symptom_category)

    # Input prompt
    input_text = (
        f"A {age}-year-old {ethnicity} {gender} patient is experiencing {symptom_category}. "
        f"What healthcare biases might affect their care? List specific, symptom-relevant biases only."
    )

    if verbose:
        print(f"📝 Input Prompt:\n{input_text}\n")

    # Tokenize input
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)

    # Generate multiple outputs
    outputs = model.generate(
        inputs["input_ids"],
        max_length=128,
        num_beams=5,
        num_return_sequences=5,
        early_stopping=True,
        no_repeat_ngram_size=2
    )

    predictions = [tokenizer.decode(output, skip_special_tokens=True).strip() for output in outputs]

    if verbose:
        print(f"🔁 Raw Model Outputs:")
        for i, pred in enumerate(predictions, 1):
            print(f"{i}. {pred}")
        print()

    # Rank candidates
    ranked = rank_predictions(predictions, symptom_category)

    if verbose:
        print("📊 Ranked Predictions (score 0–3):")
        for score, pred in ranked:
            print(f"Score: {score} → {pred}")
        print()

    # Return best result
    if ranked and ranked[0][0] == 3:
        return ranked[0][1]
    elif allow_fallback:
        if ranked:
            return f"(⚠️ Possibly off-topic or weakly relevant)\n→ {ranked[0][1]}"
    return (
        f"(⚠️ No valid prediction found for {symptom_category}.)\n"
        f"→ The model could not generate a clean response. Try refining input or retraining."
    )

# ✅ Example usage
if __name__ == "__main__":
    age = 30
    gender = "Male"
    ethnicity = "Black"
    symptom = "Musculoskeletal"

    print(f"🔍 Running prediction for: {age} | {gender} | {ethnicity} | {symptom}")
    result = predict_bias(
        age=age,
        gender=gender,
        ethnicity=ethnicity,
        symptom_category=symptom,
        allow_fallback=True,
        verbose=True
    )
    print("\n📋 Predicted Bias:\n", result)
