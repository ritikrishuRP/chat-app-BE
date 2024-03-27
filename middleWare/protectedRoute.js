import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectedRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
           return res.status(401).json({error : "unAuthorized no token provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({error : "unAuthorized Invalid token provided"});
        }

        const user =  await User.findById(decoded.userId);

        if(!user){
            return res.status(404).jason({error: "Invalid user"})
        }

        req.user = user

        next();

    } catch (error) {
        console.log("Error in protectRoute ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectedRoute;