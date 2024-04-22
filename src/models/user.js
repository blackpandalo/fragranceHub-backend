import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        image: {
            type: String,
        },
        imagePublicId: {
            type: String,
        },
        role: {
            type: Number,
            default: 0,
        },
        address: {
            type: Object,
            default: {
            street: "awoyokun",
            city: "onipanu",
            state: "lagos",
            zipCode: 123444
            }
        },
        OTP: {
            type: String,
            
        }
    },
    { timestamps: true}
)
export default mongoose.model ('User', userSchema)

