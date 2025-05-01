const express = require("express");
const workRouter = require("./work");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const minionsRouter = express.Router();

const MINIONS_MODEL = "minions";

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById(MINIONS_MODEL, id);
  if (!minion) {
    res.sendStatus(404);
  } else {
    req.minionId = id;
    req.minion = minion;
    next();
  }
});

minionsRouter.use("/:minionId/work", workRouter);

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase(MINIONS_MODEL);
  res.send(minions);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase(MINIONS_MODEL, {
    name: req.body.name,
    title: req.body.title,
    salary: Number(req.body.salary),
  });
  res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  if (req.body.name) {
    req.minion.name = req.body.name;
  }
  if (req.body.salary) {
    req.minion.salary = req.body.salary;
  }
  if (req.body.title) {
    req.minion.title = req.body.title;
  }
  const updated = updateInstanceInDatabase(MINIONS_MODEL, req.minion);
  res.send(updated);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId(MINIONS_MODEL, req.minionId);
  res.status(204).send(deleted);
});

module.exports = minionsRouter;
