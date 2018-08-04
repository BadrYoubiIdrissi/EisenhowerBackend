var express = require("express");
var gracefulShutdown = require('http-graceful-shutdown');
require("dotenv").config();

var mongoose = require("mongoose");
var dbConfig = require("./config").db;

var apiRouter = require("./routes").apiRouter;
var staticRouter = require("./routes").staticRouter;

var app = express();
var port = process.env.PORT || 5000;
var server = app.listen(port);

app.use("/api", apiRouter);
app.use(staticRouter);

mongoose.connect("mongodb://localhost:27017", dbConfig);
mongoose.connection.on('connected', () => console.log("Connected to database!"));
mongoose.connection.on('error', (err) => console.error(err));

gracefulShutdown(server);