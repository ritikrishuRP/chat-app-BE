import Conversation from "../models/conversationModel.js";
import Message from "../models/messsageModel.js";

export const sendMessage = async(req,res) => {
  try {
    
    const {message} = req.body;
    const {id: recieverId}   = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        participants : { $all : [senderId, recieverId]},
    })

    if(!conversation){
        conversation = await Conversation.create({
            participants : [senderId, recieverId],
        })
    }

    const newMessage = new Message({
         senderId,
         recieverId,
         message,
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage)

  } catch (error) {
    console.log("Error in sendMessage  controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    //finding the conversation
    const conversation = await Conversation.findOne({
      participants : {$all: [senderId, userToChatId]}
    }).populate("messages");

    if(!conversation) return res.statys(200).json([]);

    const messages = conversation.messages

    res.status(200).json(messages);
  }
   catch (error) {
    console.log("Error in getMessages  controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
