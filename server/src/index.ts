import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
    authSource: "admin"
})
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));


app.listen(3001, () => console.log("SERVER STARTED"));