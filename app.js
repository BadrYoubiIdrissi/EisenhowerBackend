var express = require("express");
var path = require("path");
require("dotenv").config();

var mongoose = require("mongoose");
var dbConfig = require("./config").db;

if(process.env.NODE_ENV == "production"){

    app.use(express.static(path.join(__dirname, "static")));
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "static/index.html"));
    }); 

mongoose.connect("mongodb://localhost:27017", dbConfig, err =>  err ? console.error('Connection error : ', err) : null);

app.listen(port);