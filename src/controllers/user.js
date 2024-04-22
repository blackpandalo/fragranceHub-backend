import User from "../models/user.js";


export const getAllUser =  async (req, res) => {
    try {
        const user = await User.find().select("-password").
        res.json({success: true, message: "Users Retrived", user})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


export const getOneUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById({_id: userId});
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.json({ success: true, message: "User retrieved successfully", user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};



export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { userId } = req.params;

        // find the userById from the user
        const user = await User.findById({_id: userId})
        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }

        // update the fields
        user.name = name ||user.name
        user.email = email || user.email
        user.password = password || user.password

        // save the updatedUser
        const updatedUser = await user.save();
        res.json({success: true, message: "User update successfully", updatedUser})
    } catch (err) {
        console.log("Error updating user", err.message)
        res.status(500).json({success: false, error: "Internal server error", message: err.message})
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.deleteOne({_id: userId})
        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }
        res.json({success: true, message: "User deleted successfully", user})
    } catch (err) {
        console.log("Error deleting user", err.message)
        res.status(500).json({success: false, error: "Internal server error", message: err.message})
    }
}