const express = require("express");
const {
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");

const meetingsRouter = express.Router();

const MEETINGS_MODEL = "meetings";

meetingsRouter.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase(MEETINGS_MODEL);
  res.send(meetings);
});

meetingsRouter.post("/", (req, res, next) => {
  console.log(req.body);
  const newMeeting = addToDatabase(MEETINGS_MODEL, createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase(MEETINGS_MODEL);
  res.sendStatus(204);
});

module.exports = meetingsRouter;
