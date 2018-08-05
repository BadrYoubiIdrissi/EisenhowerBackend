var path = require("path");
var express = require("express");

var router = express.Router();

if (process.env.NODE_ENV == "production") {
    router.use(express.static(path.join(__dirname, "../static")));
    router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "../static/index.html"));
    });
}

else {
    router.use(express.static(path.join(__dirname, "../client/build")));
    router.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
}

module.exports = router;