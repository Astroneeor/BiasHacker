import mongoose from "mongoose";

const { Schema } = mongoose;


const Doctor = new Schema({
  name: {
    type: String,
    required: true,
  },

  speciality: {
    type: String,
    required: true,
  },
  Yoe: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Doctor", Doctor);



