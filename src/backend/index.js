import { connectToDatabase } from './services/database.js';
import Patientfile  from './models/patientfile.js';
import Doctor from './models/doctor.js';
import express from 'express';
import consola from 'consola';
import cors from 'cors';

connectToDatabase();

const app = express();
app.use(express.json());

app.use(cors());
app.listen(3000, () => {
    consola.success("Server is running on port 3000");
})

app.get("/doctors", async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
    if (!doctors) {
        res.status(404).json({ message: "No doctors found" });
    }
})






app.post("/patientfile", async (req, res) => {
    //   Example request body:
   //  {
//     "key": 9815728965891273,
//     "age": 24,
//     "gender": "Male",
//     "ethnicity": "East Asian",
//     "symptom_category": "Respiratory Issues",
//     "biases": [
//       "Some East Asian patients tend to downplay symptoms due to cultural norms, and providers might not catch the severity if they assume no complaint means no issue"
//     ]
    //   }
    
  
    const file = new Patientfile({
        key: req.body.key,
        age: req.body.age,
        gender: req.body.gender,
        ethnicity: req.body.ethnicity,
        symptom_category: req.body.symptom_category,
        biases: req.body.biases,
    })

    file.save().then(() => {
        res.json({ message: "Patient file saved successfully" });
    })
})




app.get("/patientfile/:id", async (req, res) => { 
    const file = await Patientfile.findOne({ key: req.params.id });
    console.log(file);
    res.json(file);
    if (!file) {
        res.status(404).json({ message: "Patient file not found" });
    }
})