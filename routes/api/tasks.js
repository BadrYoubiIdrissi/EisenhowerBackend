var Task = require("../../models/task");
var isAuthenticated = require("../../middleware/auth").isAuthenticated;
var Boom = require("boom");

function taskRoutes(router){
    router.use("/tasks", isAuthenticated);

    router.get("/tasks", function (req, res, next) {
        Task.find({user:req.user.username},(err, tasks) => {
            if (err) return next(err)
            res.json(tasks);
        });
    });
    
    router.post("/tasks/add", function (req, res, next) {
        var task = req.body;
        task.user = req.user.username;
        task = new Task(task);
        task.save(err => err ? next(err) : res.status(201).json({ _id: task._id }));
    });

    router.post("/tasks/update", function (req, res, next) {
        var task = req.body;
        if (task._id) 
            Task.update({ _id: task._id },
                        { $set: task }, 
                        { runValidators : true },
                        err => err ? next(err) : res.status(200).send("Task updated"));
    });
    
    router.post("/tasks/sync", function (req, res, next) {
        if (req.body.constructor === Array){
            req.body.forEach(task => Task.update({ _id: task._id }, { $set: task }, { runValidators : true }, err => {if(err) next(err)} ))
            res.send("Sync succeeded");
        }
        else {
            next(Boom.badRequest("The request is not an array of tasks"))
        }
    });

    router.delete("/tasks", function (req, res, next) {
        Task.remove({ _id: req.query._id }, err => err ? next(err) : res.status(200).send("Task deleted!"));
    });
}

module.exports = taskRoutes;