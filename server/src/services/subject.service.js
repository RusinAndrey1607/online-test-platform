const { Subject } = require("../models/models");
const ApiError = require("../exceptions/api.error");

class SubjectService {
  async createSubject(name) {
    const existingSubject = await Subject.findOne({ where: { name } });
    if (existingSubject) {
      throw ApiError.BadRequest(`Subject with name ${name} already exists`);
    }
    const subject = await Subject.create({ name });
    return subject;
  }

  async getAllSubjects() {
    const subjects = await Subject.findAll();
    return subjects;
  }

  async getSubjectById(id) {
    const subject = await Subject.findByPk(id);
    if (!subject) {
      throw ApiError.NotFound(`Subject with id ${id} not found`);
    }
    return subject;
  }

  async updateSubject(id, name) {
    const subject = await Subject.findByPk(id);
    if (!subject) {
      throw ApiError.NotFound(`Subject with id ${id} not found`);
    }
    subject.name = name;
    await subject.save();
    return subject;
  }

  async deleteSubject(id) {
    const subject = await Subject.findByPk(id);
    if (!subject) {
      throw ApiError.NotFound(`Subject with id ${id} not found`);
    }
    await subject.destroy();
    return { message: `Subject with id ${id} deleted successfully` };
  }
}

module.exports = new SubjectService();
