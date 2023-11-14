const Student = require("./student.model");
const Course = require("./course.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
  const Evaluation = sequelize.define("evaluation", {
    EVAL_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    EVAL_TYPE: {
      type: DataTypes.STRING,
    },
    EVAL_NAME: {
      type: DataTypes.STRING,
    },
    EVAL_WEIGHT: {
      type: DataTypes.FLOAT,
    },
  });
  return Evaluation;
};
