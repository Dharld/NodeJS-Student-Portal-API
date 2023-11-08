module.exports = (sequelize, Sequelize, DataTypes) => {
  const Justification = sequelize.define("justification", {
    JUS_REASON: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    JUS_STATUS: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
    JUS_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  });
  return Justification;
};
