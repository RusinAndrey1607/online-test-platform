const { Question, Subject } = require("../models/models");
const ApiError = require("../exceptions/api.error");

class QuestionService {
  async getQuestionsBySubject(subjectId) {
    const questions = await Question.findAll({
      where: { subjectId },
      include: { model: Answer }
    });
    return questions;
  }
  async createQuestion(text, difficulty, subjectId) {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw ApiError.NotFound(`Subject with id ${subjectId} not found`);
    }
    const question = await Question.create({ text, difficulty, subjectId });
    return question;
  }

  async getAllQuestions() {
    const questions = await Question.findAll({ include: Subject });
    return questions;
  }

  async getQuestionById(id) {
    const question = await Question.findByPk(id, { include: Subject });
    if (!question) {
      throw ApiError.NotFound(`Question with id ${id} not found`);
    }
    return question;
  }
}

module.exports = new QuestionService();
