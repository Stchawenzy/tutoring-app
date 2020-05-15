const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Info required to create a Category
const Category = mongoose.model("Category", new mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }]
}, { timestamps: true }));


// Validation of the category info
function validateCategory(category) {
    const schema = {
        category: Joi.string().required()
    };

    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;