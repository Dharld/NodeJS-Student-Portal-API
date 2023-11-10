const db = require("../models");
const User = db.user;

exports.verifyUser = async (req, res, next) => {
  const user_id = req.params.id;
  try {
    const user = await User.findOne({
      where: {
        USER_ID: user_id,
      },
    });
    if (user) {
      req.user = user.dataValues;
    } else {
      return res.status(400).send({
        message: "There's no user with this ID",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "There's something wrong",
    });
  }
  next();
};
