const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Details required to SIGNUP as a Student
const userSchema = new mongoose.Schema({
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
    }
});


// Token is generated to each user who signs up, so as to perform the required function required
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, "jwtPrivateKey");
    return token;
};

const User = mongoose.model("User", userSchema);

//To validate the name, email and password are properly provided
function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;