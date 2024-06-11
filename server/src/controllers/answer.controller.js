const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const answerService = require("../services/answer.service");

class AnswerController {
    async createAnswer(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { text, isCorrect, value, questionId } = req.body;
            const answer = await answerService.createAnswer(text, isCorrect, value, questionId);
            return res.json(answer);
        } catch (error) {
            next(error);
        }
    }

    async getAllAnswers(req, res, next) {
        try {
            const answers = await answerService.getAllAnswers();
            return res.json(answers);
        } catch (error) {
            next(error);
        }
    }

    async getAnswerById(req, res, next) {
        try {
            const { id } = req.params;
            const answer = await answerService.getAnswerById(id);
            return res.json(answer);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AnswerController();
