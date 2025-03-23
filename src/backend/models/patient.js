import mongoose from "mongoose";

const { Schema } = mongoose;


const Patient = new Schema({
    name: {
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
    problem: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Patient", Patient);



