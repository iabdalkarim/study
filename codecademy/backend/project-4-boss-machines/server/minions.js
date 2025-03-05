const express = require("express");
const { addToDatabase, getAllFromDatabase } = require("./db");

const minionsRouter = express.Router();

minionsRouter.param("minionId", (req, res, next, id) => {});

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  res.send(minions);
});
minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", {
    name: req.body.name,
    title: req.body.title,
    salary: Number(req.body.salary),
  });
  res.status(201).send(newMinion);
});
minionsRouter.get("/:minionId", (req, res, next) => {});
minionsRouter.put("/:minionId", (req, res, next) => {});
minionsRouter.delete("/:minionId", (req, res, next) => {});

module.exports = minionsRouter;
