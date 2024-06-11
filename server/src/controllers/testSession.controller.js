const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const testSessionService = require("../services/testSession.service");

class TestSessionController {
  async saveProgress(req, res, next) {
    try {
      const { userId, currentQuestionId } = req.body;
      const session = await testSessionService.saveProgress(
        userId,
        currentQuestionId
      );
      return res.json(session);
    } catch (error) {
      next(error);
    }
  }
  async getCurrentQuestion(req, res, next) {
    try {
      const { userId } = req.params;
      const session = await testSessionService.getCurrentQuestion(userId);
      return res.json(session);
    } catch (error) {
      next(error);
    }
  }
  async createTestSession(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation Failed", errors.array()));
      }

      const { userId, currentQuestionId } = req.body;
      const testSession = await testSessionService.createTestSession(
        userId,
        currentQuestionId
      );
      return res.json(testSession);
    } catch (error) {
      next(error);
    }
  }

  async getAllTestSessions(req, res, next) {
    try {
      const testSessions = await testSessionService.getAllTestSessions();
      return res.json(testSessions);
    } catch (error) {
      next(error);
    }
  }

  async getTestSessionById(req, res, next) {
    try {
      const { id } = req.params;
      const testSession = await testSessionService.getTestSessionById(id);
      return res.json(testSession);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TestSessionController();
