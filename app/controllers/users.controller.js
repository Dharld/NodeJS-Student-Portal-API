const db = require("../models");
const User = db.user;
const Op = db.Op;
const Student = db.student;
const Teacher = db.teacher;
const ROLES = require("../utils/roles.utils");

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(200).send({
        success: true,
        data: user,
      });
    }
    return res.status(500).send({
      success: false,
      data: null,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      lname: USER_LNAME,
      fname: USER_FNAME,
      email: USER_EMAIL,
      dob: USER_DOB,
      password: USER_PASSWORD,
      role: USER_ROLE,
    } = req.body;

    const user = await User.create({
      USER_LNAME,
      USER_FNAME,
      USER_EMAIL,
      USER_ROLE,
      USER_DOB,
      USER_PASSWORD,
    });

    switch (USER_ROLE) {
      case "STUDENT":
        await Student.create({
          USER_ID: user.USER_ID,
        });
        break;
      case "TEACHER":
        await Teacher.create({
          USER_ID: user.USER_ID,
        });
        break;
    }

    if (user) {
      return res.status(200).send({
        sucess: true,
        data: user,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        USER_ROLE: {
          [Op.in]: [ROLES["STUDENT"], ROLES["TEACHER"]],
        },
      },
    });
    return res.status(200).send({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { USER_ID } = req.user;
  try {
    await User.destroy({
      where: {
        USER_ID,
      },
    });
    return res.status(200).send({
      success: true,
      data: null,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { USER_ID } = req.user;
  try {
    await User.update(req.body, {
      where: {
        USER_ID,
      },
    });

    return res.status(200).send({
      success: true,
      data: null,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
