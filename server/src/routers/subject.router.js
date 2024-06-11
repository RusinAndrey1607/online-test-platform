const express = require("express");
const { check } = require("express-validator");
const subjectController = require("../controllers/subject.controller");

const subjectRouter = express.Router();

subjectRouter.post(
  "/create",
  [
    check("name")
      .isLength({ min: 1 })
      .withMessage("Subject name must be provided")
  ],
  subjectController.createSubject
);

subjectRouter.get("/all", subjectController.getAllSubjects);

subjectRouter.get("/:id", subjectController.getSubjectById);

module.exports = subjectRouter;
