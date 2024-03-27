import User from "../models/userModel.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        
        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        //It will find all the user from database except the logged in user

        res.status(200).json(filteredUser)

    } catch (error) {
        console.error("Error in getUsersForSideBar:", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}