const { TestSession, User, Question } = require("../models/models");
const ApiError = require("../exceptions/api.error");

class TestSessionService {
  async saveProgress(userId, currentQuestionId) {
    const session = await TestSession.findOne({ where: { userId } });
    if (session) {
      session.currentQuestionId = currentQuestionId;
      await session.save();
    } else {
      await TestSession.create({ userId, currentQuestionId });
    }
    return session;
  }
  async getCurrentQuestion(userId) {
    const session = await TestSession.findOne({ where: { userId } });
    return session ? session.currentQuestionId : null;
  }
  async createTestSession(userId, currentQuestionId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.NotFound(`User with id ${userId} not found`);
    }
    const question = await Question.findByPk(currentQuestionId);
    if (!question) {
      throw ApiError.NotFound(
        `Question with id ${currentQuestionId} not found`
      );
    }
    const testSession = await TestSession.create({ userId, currentQuestionId });
    return testSession;
  }

  async getAllTestSessions() {
    const testSessions = await TestSession.findAll({
      include: [User, Question],
    });
    return testSessions;
  }

  async getTestSessionById(id) {
    const testSession = await TestSession.findByPk(id, {
      include: [User, Question],
    });
    if (!testSession) {
      throw ApiError.NotFound(`TestSession with id ${id} not found`);
    }
    return testSession;
  }
}

module.exports = new TestSessionService();
