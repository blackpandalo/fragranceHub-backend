import mongoose  from "mongoose";



export const connectDB =(url)=>{
    mongoose
    .connect(url)
    .then(() => console.log("db connnected"))
    .catch((err)=> console.log("Error connecting to mongodb",err.message) )
}

