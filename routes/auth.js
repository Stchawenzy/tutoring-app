const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const {User} = require("../models/user");
const {Tutor} = require("../models/tutor");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


// User login route
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.send(token);
});

// validates the provided info of the user before granting access
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(req, schema);
}

// Tutor login route
router.post("/tutor/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let tutor = await Tutor.findOne({ email: req.body.email });
    if (!tutor) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, tutor.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    const token = tutor.generateAuthToken();
    res.send(token);
});


// validates the provided info of the tutor before granting access
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;