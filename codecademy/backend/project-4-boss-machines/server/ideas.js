const express = require("express");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const ideasRouter = express.Router();

const IDEAS_MODEL = "ideas";

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById(IDEAS_MODEL, id);
  if (!idea) {
    res.sendStatus(404);
  } else {
    req.ideaId = id;
    req.idea = idea;
    next();
  }
});

ideasRouter.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase(IDEAS_MODEL);
  res.send(ideas);
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase(IDEAS_MODEL, {
    name: req.body.name,
    description: req.body.description,
    numWeeks: Number(req.body.numWeeks),
    weeklyRevenue: Number(req.body.weeklyRevenue),
  });
  res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  if (req.body.name) {
    req.idea.name = req.body.name;
  }
  if (req.body.description) {
    req.idea.description = req.body.description;
  }
  if (req.body.numWeeks) {
    req.idea.numWeeks = req.body.numWeeks;
  }
  if (req.body.GweeklyRevenue) {
    req.idea.weeklyRevenue = req.body.weeklyRevenue;
  }
  const updated = updateInstanceInDatabase(IDEAS_MODEL, req.idea);
  res.send(updated);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId(IDEAS_MODEL, req.ideaId);
  res.status(204).send(deleted);
});

module.exports = ideasRouter;
