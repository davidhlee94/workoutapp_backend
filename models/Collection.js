const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
    {
        collectionName: {
            type: String,
            required: [true, "collection name is required"]
        },
        description: {
            type: String
        },
        exercises: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Exercise"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;