import json
from datasets import Dataset
from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments

# Load the dataset
with open("symptom_specific_bias_dataset_500.json") as f:
    raw_data = json.load(f)

# Flatten and clean
if isinstance(raw_data, list) and len(raw_data) == 1 and isinstance(raw_data[0], list):
    raw_data = raw_data[0]
clean_data = [d for d in raw_data if isinstance(d, dict)]
filtered_data = [d for d in clean_data if all(k in d for k in ("age", "gender", "ethnicity", "symptom_category", "biases"))]

# Format input/output pairs with improved clinical prompt style
data = [{
    "input_text": (
        f"A {d['age']}-year-old {d['ethnicity']} {d['gender']} presents with {d['symptom_category'].lower()}. "
        f"What biases may affect diagnosis, evaluation, or treatment?"
    ),
    "target_text": " | ".join(d["biases"])
} for d in filtered_data]

# Convert to HuggingFace Dataset
dataset = Dataset.from_list(data)

# Choose model size: "t5-small" or "t5-base"
MODEL_NAME = "t5-small"

# Load tokenizer and model
tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME)
model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME)

# Tokenization
def preprocess(example):
    model_inputs = tokenizer(
        example["input_text"], 
        truncation=True, 
        padding="max_length", 
        max_length=128
    )
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(
            example["target_text"], 
            truncation=True, 
            padding="max_length", 
            max_length=128
        )
    model_inputs["labels"] = labels["input_ids"]
    model_inputs["attention_mask"] = model_inputs.get("attention_mask", None)
    return model_inputs

tokenized_dataset = dataset.map(preprocess, remove_columns=["input_text", "target_text"])

# Training setup
training_args = TrainingArguments(
    output_dir="./bias_model",
    per_device_train_batch_size=8,
    num_train_epochs=20,  # Increased from 15 to 20
    save_steps=500,
    save_total_limit=1,
    logging_dir='./logs',
    logging_steps=50,
    overwrite_output_dir=True,
    report_to="none"  # Set to "wandb" or "tensorboard" if using tracking
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer
)

# Train
trainer.train()

# Save model
model.save_pretrained("./bias_model")
tokenizer.save_pretrained("./bias_model")
