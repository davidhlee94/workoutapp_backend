const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

const { createUserToken } = require("../middleware/auth");

// REGISTER
// POST /auth/register
router.post("/register", async (req, res, next) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const pwStore = req.body.password;


        req.body.password = passwordHash;

        const newUser = await User.create(req.body);

        if (newUser) {
            req.body.password = pwStore;
            const authenticatedUserToken = createUserToken(req, newUser);
            res.status(201).json({
                user: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken,
            });
        } else {
            res.status(400).json({ error: "Something went wrong" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {
    try {
        const loggingUser = req.body.username;
        const foundUser = await User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);
        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});


// LOGOUT
// POST /auth/logout
router.post("/logout", (req, res, next) => {
    try {
        req.user = null;
        res.status(200).json({
            isLoggedIn: false,
            message: "User successfully logged out",
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});



module.exports = router;

