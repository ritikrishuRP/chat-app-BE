import mongoose from "mongoose";


const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://rrishu212:LpfetdXVAMgeCMQ4@cluster0.jesx5lv.mongodb.net/fullStack-chat-app?retryWrites=true&w=majority&appName=Cluster0");
        console.log("CONNECTED TO MONGODB")
    } catch (error) {
        console.log("Error connecting to mongoDB", error.message)
    
    }
}

export default connectToMongoDB;