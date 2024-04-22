import { connectDB } from "./src/db.config.js";
import dotenv from "dotenv"
import express from "express"
import authRouter from "./src/routes/auth.js"
import categoryRouter from "./src/routes/category.js";
import productRouter from "./src/routes/product.js"
import orderRouter from "./src/routes/orders.js"



dotenv.config();

// initialize express
const app = express();



app.use(express.json())
app.use(cors(["http://localhost:5173", "http://localhost:5174"]))




const port = process.env.PORT 
const dbUrl = process.env.MONGODB_URI
const jwt = process.env.JWT_SECRET
console.log(jwt);



// console.log(port);
// console.log(dbUrl);


// connect to DB
connectDB(dbUrl)

// app.get('/', (req, res) =>{
//     res.json({success: true, message:'ok'})
// })


app.use("/api/auth", authRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter)



app.listen(port, (req, res)=>{
    console.log(`fragrance Hub listen on port ${port}`);
})
console.log("good server");