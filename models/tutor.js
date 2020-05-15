const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Details required to sign up as a TUTOR
const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean //A tutor can become an Admin when he sets the boolean to "true"
});

// token generated for each tutor that signs up
tutorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, "jwtPrivateKey");
    return token;
};

const Tutor = mongoose.model("Tutor", tutorSchema);


// validates the tutor informataion if its correct
function validateTutor(tutor) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        password: Joi.boolean().required()
    };
    return Joi.validate(tutor, schema);

}

exports.Tutor = Tutor;
exports.validate = validateTutor;