const db = require("../models");
const { decryptPassword } = require("../utils/encryption.util");
const User = db.user;
const Admin = db.admin;
const Student = db.student;
const Teacher = db.teacher;

exports.signup = (req, res) => {
  // Save user to the database
  const {
    lname: USER_LNAME,
    fname: USER_FNAME,
    email: USER_EMAIL,
    dob: USER_DOB,
    password: USER_PASSWORD,
  } = req.body;
  User.create({
    USER_LNAME,
    USER_FNAME,
    USER_EMAIL,
    USER_ROLE: "ADMIN",
    USER_ACTIVATED: true,
    USER_DOB,
    USER_PASSWORD,
  })
    .then((user) => {
      const { USER_ID } = user;
      Admin.create({
        USER_ID,
      }).then((admin) => {
        console.log("The ADMIN has been created successfully", admin);
      });
      return res.status(200).send({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { USER_PASSWORD: storedPassword } = await User.findOne({
      where: {
        USER_EMAIL: email,
      },
    });

    if (password === decryptPassword(storedPassword)) {
      return res.status(200).send({
        success: true,
        data: null,
      });
    } else {
      return res.status(500).send({
        success: false,
        reason: "The password that you entered is incorrect.",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
