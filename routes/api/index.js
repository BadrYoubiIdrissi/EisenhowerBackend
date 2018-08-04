var express = require("express");
var bodyParser = require("body-parser");
var userRoutes = require("./user");
var tasksRoutes = require("./tasks");
var errorHandler = require("../../middleware/error");

var router = express.Router();
router.use(bodyParser.json());

userRoutes(router);
tasksRoutes(router);

router.use(errorHandler);

module.exports = router;