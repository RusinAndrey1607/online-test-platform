const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const resultService = require("../services/result.service");

class ResultController {
    async submitAnswers(req, res, next) {
        try {
          const { userId, answers } = req.body;
          const results = await resultService.submitAnswers(userId, answers);
          return res.json(results);
        } catch (error) {
          next(error);
        }
      }
    async createResult(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { score, userId, questionId } = req.body;
            const result = await resultService.createResult(score, userId, questionId);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAllResults(req, res, next) {
        try {
            const results = await resultService.getAllResults();
            return res.json(results);
        } catch (error) {
            next(error);
        }
    }

    async getResultById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await resultService.getResultById(id);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateResult(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { id } = req.params;
            const { score, userId, questionId } = req.body;
            const result = await resultService.updateResult(id, score, userId, questionId);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteResult(req, res, next) {
        try {
            const { id } = req.params;
            const message = await resultService.deleteResult(id);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ResultController();
