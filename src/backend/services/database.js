import mongoose from "mongoose";
import dotenv from "dotenv";
import { consola } from "consola";
dotenv.config({ path: "../../../.env" });


const uri = `mongodb+srv://biasHacker:pvtu4iu1qjFtoJBJ@cluster0.bkfgs.mongodb.net/bias-hacker`;



export async function connectToDatabase() {
    try {
       consola.start("Connecting to database...");
     await mongoose.connect(uri);
     consola.success("Database connected successfully");
   } catch (error) {
     consola.error("Database connection error:", error);
   }
}

