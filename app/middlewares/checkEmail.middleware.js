const validator = require("validator");

exports.checkEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(500).send({
      message: "There's no email address.",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(500).send({
      message: "Please provide a valid email address.",
    });
  }
  next();
};
