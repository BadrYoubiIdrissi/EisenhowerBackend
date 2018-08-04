var mongoose = require("mongoose");
var categories = require("../constants").categories;

var taskSchema = mongoose.Schema({
    user: {
        type: String,
        require: [true, "Task must have an owner"]
    },
    name: {
        type: String,
        required: [true,"Task must have a name"],
        maxlength: [40, "Task can't be more than 40 characters"]
    },
    description: {
        type: String,
        maxlength: [300, "Description can't be more than 300"]
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
    },
    done: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);