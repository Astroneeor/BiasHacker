import { connectToDatabase } from './services/database.js';
import Patient  from './models/patient.js';
import Doctor from './models/doctor.js';
import express from 'express';
import consola from 'consola';


connectToDatabase();



// const patient = new Patient({
//   name: "Reyansh",
//   age: 18,
//   gender: "Gay",
//   race: "Brown",
//   problem: "Erectile Dysfunction",
// });

// patient.save().then(() => {
//     console.log("Patient saved successfully");
// }) 




// const doctor = new Doctor({
//   name: "Dr. Karthik",
//   speciality: "Neurologist",
//   Yoe: 5,
//   Description: "Dr. Karthik is a Neurologist with 5 years of experience",
// });

// doctor.save().then(() => {
//   console.log("Doctor saved successfully");
// }); 




const app = express();
app.use(express.json());

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






app.get('/doctor/:id', async (req, res) => {
    const doctorId = req.params.id;
 
    const doctor = await Doctor.findById(doctorId);
    res.json(doctor);
    if (!doctor) {
        res.status(404).json({ message: "Doctor not found" });
    }

});

app.get('/doctore/:email', async (req, res) => {
    const doctorEmail = req.params.email;
 
    const doctor = await Doctor.findOne({ email: doctorEmail });
    res.json(doctor);
    if (!doctor) {
        res.status(404).json({ message: "Doctor not found" });
    }

}
);
