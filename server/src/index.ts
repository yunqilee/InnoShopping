import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {userRouter} from "./routes/user";
import {ProductRouter} from "./routes/product";

dotenv.config({ path: ".env" });
const app = express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter);
app.use("/product", ProductRouter);

mongoose.connect(process.env.MONGODB_URI, {
    authSource: "admin"
})
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));


app.listen(3001, () => console.log("SERVER STARTED"));