const express = require("express");
const router = express.Router();
const { Collection, Exercise } = require("../models")

require("../config/db.connection");

const { handleValidateOwnership, requireToken } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
    try {
        const collection = await Collection.find()
        // .populate('owner', 'username_id').exec();
        console.log("found", collection)
        res.status(200).json(collection);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.post("/", requireToken, async (req, res, next) => {
    try {
        const owner = req.user._id
        req.body.owner = owner
        const createdCollection = await Collection.create(req.body);
        res.status(201).json(createdCollection);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const collection = await Collection.findById(req.params.id).populate("owner").populate("exercises");
        res.status(200).json(collection);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


//grabs the specific collections exercise id's
router.get("/:id/exercises", async (req, res, next) => {
    try {
        const collectionExercises = await Collection.findById(req.params.id).populate("exercises");
        res.status(200).json(collectionExercises.exercises)
    } catch (error) {
        console.log(error);
        next(error)
    }
})



router.delete("/:id", requireToken, async (req, res, next) => {
    try {
        handleValidateOwnership(req, await Collection.findById(req.params.id))
        const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
        res.status(202).json(deletedCollection);
    } catch (error) {
        console.error(error);
        next(error);
    }
});



router.delete("/:collectionID/:exercise", async (req, res, next) => {
    try {
        const deletedExercise = await Collection.findById(req.params.collectionID).update({ $pull: { "exercise": `${req.params.exercise}` } })
        res.status(202).json(deletedExercise);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put("/:id/add-exercise", async (req, res, next) => {
    try {
        const createdExercise = await Exercise.create(req.body);
        const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: {
                    _id: createdExercise._id,
                    name: createdExercise.name,
                    sets: createdExercise.sets,
                    reps: createdExercise.reps,
                    weight: createdExercise.weight,
                    createdAt: createdExercise.createdAt,
                    updatedAt: createdExercise.updatedAt,
                    collectionID: req.params.id,
                },
            },
        });
        console.log(updatedCollection);
        res.status(201).json({ exercise: "exercise added" });
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        handleValidateOwnership(req, await Collection.findById(req.params.id))
        const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(201).json(updatedCollection)
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;