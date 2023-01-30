//import mongoose
const mongoose = require("mongoose");

//import dotenv
require("dotenv").config();
const { MONGODB_URI } = process.env;

//mongoose db connection
mongoose.set("strictQuery", true);
mongoose.connect(MONGODB_URI);

//mongo db connection indicator(s)
mongoose.connection
    .on("open", () => console.log("MongoDB connected ... 🙌 🙌 🙌`"))
    .on("close", () => console.log("MongoDB disconnected  ⚡️ 🔌 ⚡️"))
    .on("error", (error) => console.log("MongoDB connection error 😥", error));