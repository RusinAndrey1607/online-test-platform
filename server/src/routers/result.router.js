const express = require("express");
const { check } = require("express-validator");
const resultController = require("../controllers/result.controller");

const resultRouter = express.Router();

resultRouter.post(
  "/create",
  [
    check("score")
      .isInt({ min: 0 })
      .withMessage("Score must be a non-negative integer"),
    check("userId")
      .isInt()
      .withMessage("User ID must be a valid integer"),
    check("questionId")
      .isInt()
      .withMessage("Question ID must be a valid integer")
  ],
  resultController.createResult
);

resultRouter.get("/all", resultController.getAllResults);
resultRouter.post("/submit", resultController.submitAnswers);

resultRouter.get("/:id", resultController.getResultById);

module.exports = resultRouter;
