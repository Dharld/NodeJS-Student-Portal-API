const { ROLES } = require("../models");

exports.checkRole = (req, res, next) => {
  const { role } = req.body;
  if (!role) {
    return res.status(500).send({
      success: false,
      reason: "There's no role.",
    });
  }

  if (!Object.values(ROLES).includes(role)) {
    return res.status(500).send({
      success: false,
      reason: "This is not a valid role",
    });
  }
  next();
};
