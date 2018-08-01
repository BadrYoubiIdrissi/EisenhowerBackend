var express = require("express");
var Task = require("../models/task");
var defaultTasks = require("../seeds/tasks/default");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.json());

router.get("/seed/tasks", function (req, res) {
    Task.insertMany(defaultTasks, () => res.send("Database seeded with defaut tasks!"));
});

router.get("/tasks", function (req, res) {
    Task.find((err, tasks) => res.json(tasks));
});

router.post("/tasks", function (req, res) {
    if (req.body.task.id)
        Task.update({ _id: req.body.task.id }, { $set: req.body.task.modification }, err => err ? res.status(400).json(err) : res.status(200).send("Task updated"));

    else {
        task = new Task(req.body.task);
        task.save(err => err ? res.status(400).json(err) : res.status(201).json({ id: task._id }))
    }
});

router.delete("/tasks", function(req,res) {
    Task.remove({_id:req.body.id}, err => err ? res.status(400).json(err) : res.status(200).send("Task deleted!"))
})



module.exports = router;