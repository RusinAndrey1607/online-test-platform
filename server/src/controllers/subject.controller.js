const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const subjectService = require("../services/subject.service");

class SubjectController {
    async createSubject(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { name } = req.body;
            const subject = await subjectService.createSubject(name);
            return res.json(subject);
        } catch (error) {
            next(error);
        }
    }

    async getAllSubjects(req, res, next) {
        try {
            const subjects = await subjectService.getAllSubjects();
            return res.json(subjects);
        } catch (error) {
            next(error);
        }
    }

    async getSubjectById(req, res, next) {
        try {
            const { id } = req.params;
            const subject = await subjectService.getSubjectById(id);
            return res.json(subject);
        } catch (error) {
            next(error);
        }
    }

    async updateSubject(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { id } = req.params;
            const { name } = req.body;
            const subject = await subjectService.updateSubject(id, name);
            return res.json(subject);
        } catch (error) {
            next(error);
        }
    }

    async deleteSubject(req, res, next) {
        try {
            const { id } = req.params;
            const message = await subjectService.deleteSubject(id);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SubjectController();
