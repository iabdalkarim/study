const express = require("express");

const meetingsRouter = express.Router();

meetingsRouter.get("/", (req, res, next) => {});
meetingsRouter.post("/", (req, res, next) => {});
meetingsRouter.delete("/:minionId", (req, res, next) => {});

module.exports = meetingsRouter;
