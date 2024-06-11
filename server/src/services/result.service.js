const { Result, User, Question, Answer } = require("../models/models");
const ApiError = require("../exceptions/api.error");

class ResultService {
  async submitAnswers(userId, answers) {
    const results = [];
    for (const answer of answers) {
      const { questionId, answerId } = answer;
      const correctAnswer = await Answer.findOne({ where: { id: answerId, isCorrect: true } });
      const score = correctAnswer ? correctAnswer.value : 0;

      console.log(userId)
      const result = await Result.create({
        userId,
        QuestionId:questionId,
        score
      });

      results.push(result);
    }
    return results;
  }
  async createResult(score, userId, questionId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.NotFound(`User with id ${userId} not found`);
    }
    const question = await Question.findByPk(questionId);
    if (!question) {
      throw ApiError.NotFound(`Question with id ${questionId} not found`);
    }
    const result = await Result.create({ score, userId, questionId });
    return result;
  }

  async getAllResults() {
    const results = await Result.findAll({ include: [User, Question] });
    return results;
  }

  async getResultById(id) {
    const result = await Result.findByPk(id, { include: [User, Question] });
    if (!result) {
      throw ApiError.NotFound(`Result with id ${id} not found`);
    }
    return result;
  }

  async updateResult(id, score, userId, questionId) {
    const result = await Result.findByPk(id);
    if (!result) {
      throw ApiError.NotFound(`Result with id ${id} not found`);
    }
    result.score = score;
    result.userId = userId;
    result.questionId = questionId;
    await result.save();
    return result;
  }

  async deleteResult(id) {
    const result = await Result.findByPk(id);
    if (!result) {
      throw ApiError.NotFound(`Result with id ${id} not found`);
    }
    await result.destroy();
    return { message: `Result with id ${id} deleted successfully` };
  }
}

module.exports = new ResultService();
