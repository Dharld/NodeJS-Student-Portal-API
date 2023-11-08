const Student = require("./student.model");
const Course = require("./course.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
  const Evaluation = sequelize.define("evaluation", {
    EVAL_TYPE: {
      type: DataTypes.STRING,
    },

    EVAL_WEIGHT: {
      type: DataTypes.FLOAT,
    },
  });
  return Evaluation;
};
