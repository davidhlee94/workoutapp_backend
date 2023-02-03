const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name cannot be empty"]
        },
        sets: {
            type: Number,
            required: [true, "sets cannot be empty"]
        },
        reps: {
            type: Number,
            required: [true, "sets cannot be empty"]
        },
        notes: {
            type: String
        },
        weight: {
            type: Number
        },
        collectionID: {
            type: mongoose.Types.ObjectId,
            ref: "Collection"
        }
    },
    {
        timestamps: true
    }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;