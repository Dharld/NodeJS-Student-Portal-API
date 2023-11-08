module.exports = (sequelize, Sequelize, DataTypes) => {
  const Register = sequelize.define("register", {
    COURSE_ID: {
      type: DataTypes.UUID,
      references: {
        model: "Courses",
        key: "COURSE_ID",
      },
    },
    STU_ID: {
      type: DataTypes.UUID,
      references: {
        model: "Students",
        key: "STU_ID",
      },
    },
    REG_STATUS: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
  });
  return Register;
};
