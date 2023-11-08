module.exports = (sequelize, Sequelize, DataTypes) => {
  const Student = sequelize.define("student", {
    STU_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    STU_LEVEL: {
      type: DataTypes.STRING,
    },
    STU_GPA: {
      type: DataTypes.FLOAT,
    },
  });
  return Student;
};
