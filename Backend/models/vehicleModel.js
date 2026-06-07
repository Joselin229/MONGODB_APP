import mongoose from "mongoose"

const vehicleSchema = mongoose.Schema(

    {
        
        vehicleType: {
            type: String,
            required: true,
            enum: ["Car", "Motorbike", "Van"],
            default: "Car",
        },manufacturer: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        releaseYear: {
            type: Number,
            required: true
        }
        ,price: {
            type: Number,
            required: true,
        },milleage: {
            type: Number,
            required: true,
        }
     },
     {
        timestamps: true,
     }
)

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
