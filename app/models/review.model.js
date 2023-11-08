module.exports = (sequelize, Sequelize, DataTypes) => {
  const Justification = sequelize.define("justification", {
    REV_REASON: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    REV_STATUS: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
  });
  return Justification;
};
