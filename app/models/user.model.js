const {
  encryptPassword,
  decryptPassword,
} = require("../utils/encryption.util");

module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      USER_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      USER_LNAME: {
        type: DataTypes.STRING,
      },
      USER_FNAME: {
        type: DataTypes.STRING,
      },
      USER_EMAIL: {
        type: DataTypes.STRING,
        unique: true,
      },
      USER_PASSWORD: {
        type: DataTypes.STRING,
        /* get() {
          const rawValue = this.getDataValue("USER_PASSWORD");
          return rawValue ? decryptPassword(rawValue) : null;
        }, */
        set(value) {
          const cryptedPassword = encryptPassword(value);
          console.log(cryptedPassword);
          this.setDataValue("USER_PASSWORD", cryptedPassword);
        },
      },
      USER_ROLE: {
        type: DataTypes.STRING,
      },
      USER_DOB: {
        type: DataTypes.DATE,
      },
    }
  );

  return User;
};
