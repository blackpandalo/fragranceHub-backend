import User from "../models/user.js"
import { hashPassword, comparePassword} from "../helpers/auth.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { cloudinary } from "../helpers/cloudinary.config.js"


export const register = async (req, res)=>{
    try {
        const {name, email, password} = req.body
        const image = req.file;

 
        if (!name) {
            return res.status(400).json({success: false, message:"Name is required"})
        }
        if (!email) {
            return res.status(400).json({success: false, message:"Email is required"})
        }
        if (!password) {
            return res.status(400).json({success: false, message:"Password is required"})
        }
 
        const existingEmail = await User.findOne({email})
        if (existingEmail) {
            return res.status(400).json({success: false, message:"Email is Taken "})
        }

        // hash password 
        const hashedPwd = await hashPassword(password)
       

        const user = new User({
            name,
            email,
            password : hashedPwd
        })
        // handle image upload
    if (image) {
      try {
        const imagePath = await cloudinary.uploader.upload(image.path);
        user.image = imagePath.secure_url;
        user.imagePublicId = imagePath.public_id;
      } catch (err) {
        console.log(err);
        return res.json({success: false, message: "Error uploading image", err})
      }
    }

    await user.save();



        // generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})


        res.json({
            success: true,
            message: "user signin successful",
            user: {
              name: user.name,
              role: user.role,
              image: user.image,
              token,
            },
        })


        

        return res.json({success: true, user})
        
    } catch (err) {
        console.log("Error creating registration", err.message);
        return res.status(500).json({success: true, message: "Registration Failed", err});
    }
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "Email is Required" });
      }
      if (!password) {
        return res
          .status(400)
          .json({ success: false, message: "Password is Required" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({success: false, message: "User not found"});
      }
  
      
      const match = await comparePassword(password, user.password);

       // create token 
       const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})


      res.json({
        success: true,
        message: " signin successful",
        user: {
          name: user.name,
          role: user.role,
          token,
        },
    })
  
    if(!match){
      return res.status(400).json({success: false, message: "Wrong password"});
    }
     
    
      return res.json({success: true, message: "Login Successful", user})
    } catch (err) {
      console.log("Error creating registration", err.message);
      return res.status(500).json({ message: "Registration Failed", err});
  
    }
  };


  export const forgotPassword = async (req, res) =>{
    try {
      const { email } =  req.body
      if (!email) {
        return res.status(400).json({message: "Email is required"})
      }
      // find the user by email
      const user = await User.findOne({email})
      if(!user){
        return res.status(404).json({error: "user not found "});
      }
      // Otp AND SEND TO USER


      // generate password reset token 
      const resetTOken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
      // send reset token to user's email address
      const domain = "www.blard.com";
      const resetLink = `${domain}/reset/${resetTOken}`

      // send response including the resetToken
      return res.json({ message: "Password reset token generated successfully", resetTOken });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Failed to create reset token"})
    }
  }
// resetpassword function

export const resetpassword = async (req, res) => {
  try {
    const { newPassword } = req.body

    const resetToken = req.headers.authoriztion
    if (!newPassword) {
      return res.json({success: false, message: "Enter new password"})
    }
    
    if (!resetToken || !resetToken.startWith("Bearer")) {
      return res.status(401).json({success: false, message: "invalid token or no token provided"})
    }


    // get token without the "bearer"
    const token = resetToken.split("")[1]


    // verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
      return res.status(403).json({success: false, message: "Invalid/expired token provided"})
    }
    const userId = decodedToken._id

    // find user by userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(403).json({ error: "invalid user"})
    }

    const hashedPassword = await hashPassword(newPassword)
    user.password = hashedPassword
    
    // save user including the new password
    await user.save()
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: "Password reset failed", error: err.message });
  }
}



