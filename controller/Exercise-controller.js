const express = require("express");
const router = express.Router();
const { Exercise } = require("../models");

require("../config/db.connection");

router.get("/:id", async (req, res, next) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        res.status(200).json(exercise);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
        res.status(202).json(deletedExercise);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(201).json(updatedExercise);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;