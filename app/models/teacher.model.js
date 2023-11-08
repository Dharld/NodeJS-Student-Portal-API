module.exports = (sequelize, Sequelize, DataTypes) => {
  const Teacher = sequelize.define("teacher", {
    TEACHER_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  });
  return Teacher;
};
