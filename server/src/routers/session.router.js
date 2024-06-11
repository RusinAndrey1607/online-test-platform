const express = require("express");
const { check } = require("express-validator");
const testSessionController = require("../controllers/testSession.controller");

const testSessionRouter = express.Router();

testSessionRouter.post(
  "/create",
  [
    check("userId")
      .isInt()
      .withMessage("User ID must be a valid integer"),
    check("currentQuestionId")
      .isInt()
      .withMessage("Current Question ID must be a valid integer")
  ],
  testSessionController.createTestSession
);
testSessionRouter.get("/current/:userId", testSessionController.getCurrentQuestion);
testSessionRouter.get("/all", testSessionController.getAllTestSessions);
testSessionRouter.post("/save", testSessionController.saveProgress);
testSessionRouter.get("/:id", testSessionController.getTestSessionById);

module.exports = testSessionRouter;
