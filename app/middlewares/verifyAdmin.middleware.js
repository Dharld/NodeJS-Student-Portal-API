const db = require("../models");
const Admin = db.admin;

exports.verifyAdmin = async (req, res, next) => {
  const user_id = req.query.adminId;
  if (!user_id) {
    return res.status(500).send({
      success: false,
      message: "There's no admin id",
    });
  }
  try {
    const user = await Admin.findOne({
      where: {
        USER_ID: user_id,
      },
    });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "This user isn't an admin",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "There's something wrong",
    });
  }
  next();
};
