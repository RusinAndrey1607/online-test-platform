
const resultService = require("../services/result.service");

class ResultController {
  async getUserTotalScore(req, res, next) {
    try {
      const { userId } = req.params;
      const { totalScore, possibleTotalScore } =
        await resultService.getUserTotalScore(userId);
      return res.json({ userId, totalScore, possibleTotalScore });
    } catch (error) {
      next(error);
    }
  }
  async submitAnswers(req, res, next) {
    try {
      const { userId, answers } = req.body;
      const results = await resultService.submitAnswers(userId, answers);
      return res.json(results);
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

}

module.exports = new ResultController();
