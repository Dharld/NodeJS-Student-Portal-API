module.exports = (sequelize, Sequelize, DataTypes) => {
  const Admin = sequelize.define("admin", {
    ADMIN_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  });
  return Admin;
};
