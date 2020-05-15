const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const {Category, validate} = require("../models/category");
const {Subject} = require("../models/subject");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// To get all the categories
router.get("/", auth, async (req, res) => {
    const categories = await Category.find().sort("category");
    res.send(categories);
});

// to create a category which can only be done by the Admin
router.post("/", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = new Category({ category: req.body.category });
    category = await category.save();

    res.send(category);
});


// create a Subject in a Category using its ID
router.post("/:id", auth, async (req, res) => {
    let subject = await Subject({ 
        tutor: req.body.tutor,
        subject: req.body.subject
     });
    subject = await subject.save();
    
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, 
        {$push: {subjects: subject._id}}, { new: true, useFindAndModify: false });

    res.send(category);
    
});


// Updating a subject in a Category
router.put("/subject/:id", auth, async (req, res) => {
    const subject = await Subject.findByIdAndUpdate(req.params.id, { 
        tutor: req.body.tutor,
        subject: req.body.subject 
    }, 
        {
            new: true
        });

    if (!subject) return res.status(404).send("The subject with the given ID was not found.");

    res.send(subject);
});


// Updating a Category with the ID
router.put("/:id", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const category = await Category.findByIdAndUpdate(req.params.id, { category: req.body.category }, 
        {
            new: true
        });

    if (!category) return res.status(404).send("The category with the given ID was not found.");

    res.send(category);
});


// Deleting a subject in a category by its ID
router.delete("/subject/:id", auth, async (req, res) => {
    const subject = await Subject.findByIdAndRemove(req.params.id);

    if (!subject) return res.status(404).send("The subject with the given ID was not found.");

    res.send(subject);
});


// Deleting a category
router.delete("/:id", [auth, admin], async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).send("The category with the given ID was not found.");

    res.send(category);
});


// retrieve a category by ID
router.get("/:id", auth, async (req, res) => {
    const category = await Category.findOne({ _id: req.params.id }).populate("subjects");
    res.send(category);
});

// retrieve a sbuject in a category by ID
router.get("/subject/:id", auth, async (req, res) => {
    const subject = await Subject.findOne({ _id: req.params.id });
    res.send(subject);
});




module.exports = router;