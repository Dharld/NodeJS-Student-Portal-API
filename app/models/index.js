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
});
db.course.belongsToMany(db.student, { through: db.register });

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
db.class.belongsTo(db.course);

/** Teacher <-> 1:N <-> Class */
db.teacher.hasMany(db.course, {
  foreignKey: "TEACHER_ID",
});
db.course.belongsTo(db.teacher);

/** Student <-> M:N <-> Course through Register */
db.student.belongsToMany(db.course, { through: db.register });
db.course.belongsToMany(db.student, { through: db.register });

/** Student <-> M:N <-> Course through Evaluation */
db.student.belongsToMany(db.course, { through: db.participate });
db.course.belongsToMany(db.student, { through: db.participate });

/** Student <-> M:N <-> Class through Attend */
db.student.belongsToMany(db.class, { through: db.attend });
db.course.belongsToMany(db.class, { through: db.attend });

/** Attend <-> 1:1 <-> Justification */
db.attend.hasOne(db.justification, {
  foreignKey: "ATTEND_ID",
});

module.exports = db;
