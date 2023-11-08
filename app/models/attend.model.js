const Class = require("./class.model");
const Student = require("./student.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
  const Attend = sequelize.define("attend", {
    CLASS_ID: {
      type: DataTypes.UUID,
      references: {
        model: "Classes",
        key: "CLASS_ID",
      },
    },
    STU_ID: {
      type: DataTypes.UUID,
      references: {
        model: "Students",
        key: "STU_ID",
      },
    },
    ATTEND_STATUS: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ATTEND_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  });
  return Attend;
};
