module.exports = (sequelize, Sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    COURSE_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    COURSE_NAME: {
      type: DataTypes.STRING,
    },
    COURSE_DESC: {
      type: DataTypes.STRING,
    },
    COURSE_CODE: {
      type: DataTypes.STRING,
    },
    COURSE_STATUS: {
      type: DataTypes.STRING,
    },
  });
  return Course;
};
