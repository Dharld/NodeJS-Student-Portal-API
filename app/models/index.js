const { Sequelize, DataTypes, Op } = require("sequelize");
const config = require("./../config/config");

const db = {};

const sequelize = new Sequelize(config.db.DB_NAME, config.db.DB_USER, "", {
  host: config.db.DB_HOST,
  dialect: config.db.dialect,

  poll: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle,
  },
});

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

// MODELS
db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.student = require("./student.model")(sequelize, Sequelize, DataTypes);
db.admin = require("./admin.model")(sequelize, Sequelize, DataTypes);
db.teacher = require("./teacher.model")(sequelize, Sequelize, DataTypes);

db.class = require("./class.model")(sequelize, Sequelize, DataTypes);
db.course = require("./course.model")(sequelize, Sequelize, DataTypes);

db.register = require("./register.model")(sequelize, Sequelize, DataTypes);
db.participate = require("./participate.model")(
  sequelize,
  Sequelize,
  DataTypes
);

// /** Student <-> M:N <-> Course through Register */
db.student.belongsToMany(db.course, {
  through: db.register,
  foreignKey: "COURSE_ID",
});
db.course.belongsToMany(db.student, {
  through: db.register,
  foreignKey: "STU_ID",
});

db.evaluation = require("./evaluation.model")(sequelize, Sequelize, DataTypes);
db.attend = require("./attend.model")(sequelize, Sequelize, DataTypes);
db.justification = require("./justification.model")(
  sequelize,
  Sequelize,
  DataTypes
);

db.ROLES = ["ADMIN", "STUDENT", "TEACHER"];

// ASSOCIATIONS

/** User to derived entities */
db.user.hasOne(db.admin, {
  foreignKey: "USER_ID",
  allowNull: false,
});
db.user.hasOne(db.student, {
  foreignKey: "USER_ID",
  allowNull: false,
});
db.user.hasOne(db.teacher, {
  foreignKey: "USER_ID",
  allowNull: false,
});

/** Course <-> 1:N <-> Class */
db.course.hasMany(db.class, {
  foreignKey: "COURSE_ID",
});
db.class.belongsTo(db.course, {
  foreignKey: "COURSE_ID",
});

/** Teacher <-> 1:N <-> Class */
db.teacher.hasMany(db.course, {
  foreignKey: "TEACHER_ID",
});
db.course.belongsTo(db.teacher, {
  foreignKey: "TEACHER_ID",
});

/** Student <-> M:N <-> Course through Register */
db.student.belongsToMany(db.course, {
  through: db.register,
  foreignKey: "COURSE_ID",
});
db.course.belongsToMany(db.student, {
  through: db.register,
  foreignKey: "STU_ID",
});

/** Student <-> M:N <-> Course through Evaluation */
db.student.belongsToMany(db.course, {
  through: db.participate,
  foreignKey: "COURSE_ID",
});
db.course.belongsToMany(db.student, {
  through: db.participate,
  foreignKey: "STU_ID",
});

/** Student <-> M:N <-> Class through Attend */
db.student.belongsToMany(db.class, {
  through: db.attend,
  foreignKey: "CLASS_ID",
});
db.class.belongsToMany(db.student, {
  through: db.attend,
  foreignKey: "STU_ID",
});

/** Attend <-> 1:1 <-> Justification */
db.attend.hasOne(db.justification, {
  foreignKey: "ATTEND_ID",
});

module.exports = db;
