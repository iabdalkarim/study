const express = require("express");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const workRouter = express.Router({ mergeParams: true });

const WORK_MODEL = "work";

workRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById(WORK_MODEL, id);
  if (!work) {
    res.sendStatus(404);
  } else {
    req.workId = id;
    req.work = work;
    next();
  }
});

function getWork(minionId) {
  const work = getAllFromDatabase(WORK_MODEL);
  return work ? work.filter((work) => work.minionId === minionId) : [];
}

function isValidMinion(req, res, next) {
  if (req.minionId === req.work.minionId) {
    next();
  } else {
    res.sendStatus(400);
  }
}

workRouter.get("/", (req, res, next) => {
  res.send(getWork(req.minionId));
});

workRouter.post("/", (req, res, next) => {
  const newWork = addToDatabase(WORK_MODEL, {
    title: req.body.title,
    description: req.body.description,
    hours: Number(req.body.hours),
    minionId: req.minionId,
  });
  res.status(201).send(newWork);
});

workRouter.put("/:workId", isValidMinion, (req, res, next) => {
  if (req.body.title) {
    req.work.title = req.body.title;
  }
  if (req.body.description) {
    req.work.description = req.body.description;
  }
  if (req.body.hours) {
    req.work.hours = req.body.hours;
  }
  const updated = updateInstanceInDatabase(WORK_MODEL, req.work);
  res.send(updated);
});

workRouter.delete("/:workId", isValidMinion, (req, res, next) => {
  const deleted = deleteFromDatabasebyId(WORK_MODEL, req.workId);
  res.status(204).send(deleted);
});

module.exports = workRouter;
