import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const brewerySchema = mongoose.Schema(
    {
        _id: { 
            type: String,
            default: () => uuidv4()
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const Brewery = mongoose.model("Brewery", brewerySchema)
