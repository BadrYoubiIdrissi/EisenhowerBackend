
var mongoose = require("mongoose");
var passwordLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({});

userSchema.plugin(passwordLocalMongoose);

module.exports = mongoose.model("User", userSchema)