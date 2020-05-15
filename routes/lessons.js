const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {Lesson, validate} = require("../models/lesson");
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();


// To retrieve all the lessons
router.get("/", [auth, admin], async (req, res) => {
    const lessons = await Lesson.find().sort("course")
    res.send(lessons);
});


// to create a lesson
router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let lesson = new Lesson({
        course: req.body.course,
        venue: req.body.venue,
        time: req.body.time
    });
    lesson = await lesson.save();

    res.send(lesson);
});


// updating a lesson with ID
router.put("/:id", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, 
        { 
            course: req.body.course,
            venue: req.body.venue,
            time: req.body.time
        },
        {
            new: true
        });

    if (!lesson) return res.status(404).send("The lesson with the given ID was not found.");

    res.send(lesson);
});


// to delete a lesson by ID
router.delete("/:id", [auth, admin], async (req, res) => {
    const lesson = await Lesson.findByIdAndRemove(req.params.id);

    if (!lesson) return res.status(404).send("The lesson with the given ID was not found.");

    res.send(lesson);
});


// to retrive a lesson by ID
router.get("/:id", [auth, admin], async (req, res) => {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) return res.status(404).send("The lesson with the given ID was not found.");

    res.send(lesson);
});


module.exports = router;