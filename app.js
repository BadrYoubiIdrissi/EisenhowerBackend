var express = require("express");
var path = require("path");
require("dotenv").config();
var app = express();

var port  = process.env.PORT || 5000;

app.get("/api", function(req, res){
    res.send({ sampleObject : "Hi i'm a sample object! with lots of love"});
})

if(process.env.NODE_ENV == "production"){

    app.use(express.static(__dirname + "/static"));
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname + "/static/index.html"));
    }); 

}

app.listen(port);