const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const questionService = require("../services/question.service");

class QuestionController {
  async getQuestionsBySubject(req, res, next) {
    try {
      const { subjectId } = req.params;
      const questions = await questionService.getQuestionsBySubject(subjectId);
      return res.json(questions);
    } catch (error) {
      next(error);
    }
  }
  async createQuestion(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation Failed", errors.array()));
      }

      const { text, difficulty, subjectId } = req.body;
      const question = await questionService.createQuestion(
        text,
        difficulty,
        subjectId
      );
      return res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async getAllQuestions(req, res, next) {
    try {
      const questions = await questionService.getAllQuestions();
      return res.json(questions);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionById(req, res, next) {
    try {
      const { id } = req.params;
      const question = await questionService.getQuestionById(id);
      return res.json(question);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new QuestionController();
