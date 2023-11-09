const db = require("../models");
const {
  encryptPassword,
  decryptPassword,
} = require("../utils/encryption.util");
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
    role: USER_ROLE,
    dob: USER_DOB,
    password: USER_PASSWORD,
  } = req.body;
  User.create({
    USER_LNAME,
    USER_FNAME,
    USER_EMAIL,
    USER_ROLE,
    USER_DOB,
    USER_PASSWORD,
  })
    .then((user) => {
      const role = user.USER_ROLE;

      // Check for the role
      if (!role) {
        return res.status(500).send({
          message: "Please enter a role",
        });
      }
      if (role && !db.ROLES.includes(role)) {
        return res.status(500).send({
          message: "You must specify the role of the user",
        });
      } else {
        // Creation of the derived entity
        const USER_ID = user.USER_ID;
        switch (role) {
          case "ADMIN":
            Admin.create({
              USER_ID,
            }).then((admin) => {
              console.log("The admin has been created successfully", admin);
            });
            break;
          case "STUDENT":
            Student.create({
              USER_ID,
            }).then((student) => {
              console.log("The student has been created successfully", student);
            });
            break;
          case "TEACHER":
            Teacher.create({
              USER_ID,
            }).then((teacher) => {
              console.log("The teacher has been created successfully", teacher);
            });
            break;
        }
      }

      return res.status(200).send({
        message: "The user has been created successfully",
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
        message: "You are successfully logged in within the system.",
        data: null,
      });
    } else {
      return res.status(500).send({
        message: "The password that you entered is incorrect.",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "You can't login",
    });
  }
};
