var mongoose = require("mongoose");
var categories = require("../constants").categories;

var taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40
    },
    description: {
        type: String,
        maxlength: 300
    },
    category: {
        type: String,
        required: true,
        enum: [categories.URGENT_IMPORTANT,
               categories.URGENT_N_IMPORTANT,
               categories.N_URGENT_IMPORTANT,
               categories.N_URGENT_N_IMPORTANT],
    },
    width: {
        type: Number,
        min: 1,
        max: 2,
        required: true
    },
    height: {
        type: Number,
        min: 1,
        max: 2,
        required: true
    },
    urgence: {
        type: Number,
        min: 0,
        required: true
    },
    importance: {
        type: Number,
        min: 0,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);