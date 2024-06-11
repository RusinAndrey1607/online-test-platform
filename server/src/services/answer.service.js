const { Answer, Question } = require("../models/models");
const ApiError = require("../exceptions/api.error");

class AnswerService {
  async createAnswer(text, isCorrect, value, questionId) {
    const question = await Question.findByPk(questionId);
    if (!question) {
      throw ApiError.NotFound(`Question with id ${questionId} not found`);
    }
    const answer = await Answer.create({ text, isCorrect, value, questionId });
    return answer;
  }

  async getAllAnswers() {
    const answers = await Answer.findAll({ include: Question });
    return answers;
  }

  async getAnswerById(id) {
    const answer = await Answer.findByPk(id, { include: Question });
    if (!answer) {
      throw ApiError.NotFound(`Answer with id ${id} not found`);
    }
    return answer;
  }

  async updateAnswer(id, text, isCorrect, value, questionId) {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      throw ApiError.NotFound(`Answer with id ${id} not found`);
    }
    answer.text = text;
    answer.isCorrect = isCorrect;
    answer.value = value;
    answer.questionId = questionId;
    await answer.save();
    return answer;
  }

  async deleteAnswer(id) {
    const answer = await Answer.findByPk(id);
    if (!answer) {
      throw ApiError.NotFound(`Answer with id ${id} not found`);
    }
    await answer.destroy();
    return { message: `Answer with id ${id} deleted successfully` };
  }
}

module.exports = new AnswerService();
