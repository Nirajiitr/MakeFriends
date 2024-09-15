import { User } from "../models/authModel.js";

export const getUser = async(req, res)=>{
    const LoggedInUser = req.id;
    try{
      const OtherUsers = await User.find({ _id: { $ne: LoggedInUser } }).select("-Password");
    if (!OtherUsers) {
     return res.status(404).json({ message: "User not found" });
   }
 res.status(200).json(OtherUsers);
 }catch(error) {
  
   res.status(500).json({ message: "Server error"});
 }

}
