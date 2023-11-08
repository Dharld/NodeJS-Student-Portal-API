module.exports = (sequelize, Sequelize, DataTypes) => {
  const Participate = sequelize.define("participate", {
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
    PART_MARK: {
      type: DataTypes.INTEGER,
    },
    PART_APPRECIATION: {
      type: DataTypes.STRING,
    },
    PART_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  });
  return Participate;
};
