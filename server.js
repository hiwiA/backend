const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const taskRoutes = express.Router();
let Tasks = require("./taskm");
const tasks = require("./taskm");
//const passport = require("passport");
//const users = require("./users");
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/task", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log(" db is connected");
});
taskRoutes.route("/").get(function (req, res) {
  Tasks.find(function (err, task) {
    if (err) {
      console.log(err);
    } else {
      res.json(task);
    }
  });
});

taskRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Tasks.findById(id, function (err, task) {
    res.json(task);
  });
});

taskRoutes.route("/add").post(function (req, res) {
  let tasks = new Tasks(req.body);
  tasks
    .save()
    .then((tasks) => {
      res.status(200).json({ tasks: "task add to db" });
    })
    .catch((err) => {
      res.status(400).send("creating task failed");
    });
});

taskRoutes.route("/update/:id").post(function (req, res) {
  Tasks.findById(req.params.id, function (err, tasks) {
    if (!tasks) res.status(404).send("data not found");
    else tasks.tms_number = req.body.tms_number;
    tasks.tms_name = req.body.tms_name;
    tasks.tms_description = req.body.tms_description;
    tasks.tms_assigned = req.body.tms_assigned;
    tasks.tms_startdate = req.body.tms_startdate;
    tasks.tms_enddate = req.body.tms_enddate;
    tasks.tms_status = req.body.tms_status;
    tasks.tms_completed = req.body.tms_completed;

    tasks
      .save()
      .then((tasks) => {
        res.json("Task updated");
      })
      .catch((err) => {
        res.status(404).send("update didnt happen");
      });
  });
});
// Passport middleware
//app.use(passport.initialize());
// Passport config
//require("./passport")(passport);
// Routes
//app.use("/users", users);
app.use("/tasks", taskRoutes);
app.listen(PORT, function () {
  console.log("server start" + PORT);
});
