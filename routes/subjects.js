const auth = require("../middleware/auth");
const {Subject, validate} = require("../models/subject");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


// route to get all the subjects registered
router.get("/", auth, async (req, res) => {
    const subjects = await Subject.find({}).sort({subject: 1});
    res.send(subjects);
});

module.exports = router;