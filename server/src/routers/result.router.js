const express = require("express");
const resultController = require("../controllers/result.controller");

const resultRouter = express.Router();

resultRouter.get("/all", resultController.getAllResults);
resultRouter.post("/submit", resultController.submitAnswers);
resultRouter.get("/user/:userId/total-score", resultController.getUserTotalScore);

module.exports = resultRouter;
