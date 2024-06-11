const express = require("express");
const { check } = require("express-validator");
const answerController = require("../controllers/answer.controller");

const answerRouter = express.Router();

answerRouter.post(
  "/create",
  [
    check("text")
      .isLength({ min: 1 })
      .withMessage("Answer text must be provided"),
    check("isCorrect")
      .isBoolean()
      .withMessage("isCorrect must be a boolean value"),
    check("value")
      .isInt({ min: 0, max: 10 })
      .withMessage("Value must be between 0 and 10"),
    check("questionId")
      .isInt()
      .withMessage("Question ID must be a valid integer")
  ],
  answerController.createAnswer
);

answerRouter.get("/all", answerController.getAllAnswers);

answerRouter.get("/:id", answerController.getAnswerById);

module.exports = answerRouter;
