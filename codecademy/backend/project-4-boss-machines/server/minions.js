const express = require("express");

const minionsRouter = express.Router();

minionsRouter.param("minionId", (req, res, next, id) => {});

minionsRouter.get("/", (req, res, next) => {});
minionsRouter.post("/", (req, res, next) => {});
minionsRouter.get("/:minionId", (req, res, next) => {});
minionsRouter.put("/:minionId", (req, res, next) => {});
minionsRouter.delete("/:minionId", (req, res, next) => {});

module.exports = minionsRouter;
