const Joi = require("joi");
const mongoose = require("mongoose");


// Info required to book a lesson
const lessonSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Lesson = mongoose.model("Lesson", lessonSchema);


// Validating the required info for the lesson
function validateLesson(lesson) {
    const schema = {
        course: Joi.string().required(),
        venue: Joi.string().required(),
        time: Joi.string().required()
    };

    return Joi.validate(lesson, schema);
}

exports.lessonSchema = lessonSchema;
exports.Lesson = Lesson;
exports.validate = validateLesson;