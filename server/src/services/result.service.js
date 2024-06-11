const { Result, User, Question, Answer } = require("../models/models");

class ResultService {
  async getUserTotalScore(userId) {
    const userResults = await Result.findAll({ where: { userId } });
    const totalScore = userResults.reduce(
      (total, result) => total + result.score,
      0
    );

    const possibleTotalScore = await this.getPossibleTotalScore(userId);

    return { totalScore, possibleTotalScore };
  }

  async getPossibleTotalScore(userId) {
    const userResults = await Result.findAll({
      where: { userId },
      include: [{ model: Question }],
    });

    const questionIds = userResults.map((result) => result.questionId);
    const questions = await Question.findAll({
      where: { id: questionIds },
      include: [{ model: Answer }],
    });

    const possibleTotalScore = questions.reduce((total, question) => {
      const maxAnswerValue = Math.max(
        ...question.Answers.map((answer) => answer.value)
      );
      return total + maxAnswerValue;
    }, 0);

    return possibleTotalScore;
  }
  async submitAnswers(userId, answers) {
    const existingResults = await Result.findAll({
      where: { userId },
      raw: true,
    });

    const existingResultsMap = existingResults.reduce((acc, result) => {
      acc[result.questionId] = result;
      return acc;
    }, {});

    const results = [];
    for (const answer of answers) {
      const { questionId, answerId } = answer;
      const correctAnswer = await Answer.findOne({
        where: { id: answerId, isCorrect: true },
      });
      const score = correctAnswer ? correctAnswer.value : 0;

      if (existingResultsMap[questionId]) {
        const updatedResult = await Result.update(
          { answerId, score },
          { where: { userId, questionId }, returning: true }
        );
        results.push(updatedResult[1][0]);
      } else {
        const result = await Result.create({
          userId,
          questionId,
          answerId,
          score,
        });
        results.push(result);
      }
    }
    return results;
  }
  async getAllResults() {
    const results = await Result.findAll({ include: [User, Question] });
    return results;
  }
}

module.exports = new ResultService();
