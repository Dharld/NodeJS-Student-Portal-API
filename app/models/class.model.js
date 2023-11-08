module.exports = (sequelize, Sequelize, DataTypes) => {
  const Class = sequelize.define("class", {
    CLASS_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    CLASS_ROOM: {
      type: DataTypes.STRING,
    },
    CLASS_TIME: {
      type: DataTypes.DATE,
    },
  });
  return Class;
};
