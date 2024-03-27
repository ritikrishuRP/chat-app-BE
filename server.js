import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())  //to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser())

app.listen(5000, ()=>{
    console.log("Server is running on 5000")
    connectToMongoDB();
})

// app.get("/",(req,res)=>{
//     res.send("Hello world")
// })

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes)