const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        collectionOfWorkouts: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Collection"
            }
        ]
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model("User", userSchema);