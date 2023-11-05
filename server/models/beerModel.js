import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const beerSchema = mongoose.Schema(
    {
        _id: { 
            type: String,
            default: () => uuidv4()
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        alcoholContent: {
            type: Number,
            required: true
        },
        typeOfBeer: {
            type: String,
            enum : ["světlé", "polotmavé", "tmavé", "řezané", "jiný"],
            required: true
        },
        breweryId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const Beer = mongoose.model("Beer", beerSchema)
