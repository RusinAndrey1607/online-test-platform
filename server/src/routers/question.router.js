const express = require("express");
const { check } = require("express-validator");
const questionController = require("../controllers/question.controller");
const questionRouter = express.Router();

questionRouter.post(
  "/create",
  [
    check("text")
      .isLength({ min: 1 })
      .withMessage("Question text must be provided"),
    check("difficulty")
      .isInt({ min: 1, max: 5 })
      .withMessage("Difficulty must be between 1 and 5"),
    check("subjectId")
      .isInt()
      .withMessage("Subject ID must be a valid integer"),
  ],
  questionController.createQuestion
);
questionRouter.get(
  "/questions-with-answers",
  questionController.getQuestionsWithAnswers
);

questionRouter.get("/all", questionController.getAllQuestions);

questionRouter.get("/:id", questionController.getQuestionById);
questionRouter.get(
  "/subject/:subjectId",
  questionController.getQuestionsBySubject
);

module.exports = questionRouter;
