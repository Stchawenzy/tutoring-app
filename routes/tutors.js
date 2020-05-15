const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const {Tutor, validate} = require("../models/tutor");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Route to get the list of all tutors
router.get("/", auth, async (req, res) => {
    const tutors = await Tutor.find({}).sort({name: 1});
    res.send(tutors);
});


// route to create a tutor
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let tutor = await Tutor.findOne({ email: req.body.email });
    if (tutor) return res.status(400).send("Tutor already registered.");

    tutor = new Tutor(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
    const salt = await bcrypt.genSalt(10);
    tutor.password = await bcrypt.hash(tutor.password, salt);
    await tutor.save();

    const token = tutor.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(tutor, ["_id", "name", "email"]));

});


// route to delete a tutor by its ID
router.delete("/:id", [auth, admin], async (req, res) => {
    const tutor = await Tutor.findByIdAndRemove(req.params.id);

    if (!tutor) return res.status(404).send("The tutor with the given ID was not found.");

    res.send(tutor);
});


// Route to retrieve a tutor by its ID
router.get("/:id", [auth, admin], async (req, res) => {
    const tutor = await Tutor.findById(req.params.id);

    if (!tutor) return res.status(404).send("The tutor with the given ID was not found.");

    res.send(tutor);
});





module.exports = router;