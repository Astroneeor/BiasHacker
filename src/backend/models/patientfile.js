import mongoose from "mongoose";

const { Schema } = mongoose;


const Patientfile = new Schema({
  key: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  ethinicity: {
    type: String,
    required: true,
  },
  symptom_category: {
    type: String,
    required: true,
  },
  biases: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Patientfile", Patientfile);



