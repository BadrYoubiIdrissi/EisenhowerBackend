var express = require("express");
var Task = require("../models/task");
var defaultTasks = require("../seeds/tasks/default");
var bodyParser = require("body-parser");

function upsertTask(task, res) {
    if (task.id)
        Task.update({ _id: task.id }, { $set: task.modification }, err => err ? res.status(400).json(err) : res.status(200).send("Task updated"));

    else {
        task = new Task(task);
        task.save(err => err ? res.status(400).json(err) : res.status(201).json({ id: task._id }))
    }
}

function updateTask(task) {
    return Task.update({ _id: task.id }, { $set: task }, err => err ? console.error(err) : null);
}

var router = express.Router();

router.use(bodyParser.json());

router.get("/seed/tasks", function (req, res) {
    Task.insertMany(defaultTasks, () => res.send("Database seeded with defaut tasks!"));
});

router.get("/tasks", function (req, res) {
    Task.find((err, tasks) => res.json(tasks));
});

router.post("/tasks", function (req, res) {
    if (req.body.constructor === Object)
        upsertTask(req.body, res);
    else if (req.body.constructor === Array){
        req.body.map(task => updateTask(task))
        res.send("Sync succeeded");
    }
});

router.delete("/tasks", function (req, res) {
    Task.remove({ _id: req.query.id }, err => err ? res.status(400).json(err) : res.status(200).send("Task deleted!"));
})



module.exports = router;