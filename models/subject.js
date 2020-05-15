const Joi = require("joi");
const mongoose = require("mongoose");

// Info required to creat asubject
const Subject = mongoose.model("Subject", new mongoose.Schema({
    tutor: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, { timestamps: true }));


// validating the info required
function validateSubject(subject) {
    const schema = {
        tutor: Joi.string().required(),
        subject: Joi.string().required()
    };

    return Joi.validate(subject, schema);
}



exports.Subject = Subject;
exports.validate = validateSubject;