const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/db");

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class Role extends Model {}

Role.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, modelName: "Role" }
);

User.belongsTo(Role);

class Subject extends Model {}

Subject.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, modelName: "Subject" }
);

class Question extends Model {}

Question.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.STRING, allowNull: false },
    difficulty: { type: DataTypes.INTEGER, allowNull: false },
    subjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Question" }
);

Question.belongsTo(Subject, { foreignKey: "subjectId" });

class Answer extends Model {}

Answer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.STRING, allowNull: false },
    isCorrect: { type: DataTypes.BOOLEAN, allowNull: false },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0, max: 10 },
    },
    questionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Question,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Answer" }
);
Question.hasMany(Answer, { foreignKey: "questionId" });

Answer.belongsTo(Question, { foreignKey: "questionId" });

class Result extends Model {}

Result.init(
  {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Result" }
);

Result.belongsTo(Answer, { foreignKey: 'answerId' });
Result.belongsTo(User, { foreignKey: "userId" });
Result.belongsTo(Question);

class TestSession extends Model {}

TestSession.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    currentQuestionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Question,
        key: "id",
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "TestSession" }
);

TestSession.belongsTo(User, { foreignKey: "userId" });
TestSession.belongsTo(Question, { foreignKey: "currentQuestionId" });

module.exports = { User, Role, Subject, Question, Answer, Result, TestSession };
