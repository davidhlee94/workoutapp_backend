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
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        }
    },
    {
        timestamps: true
    }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;