const db = require("../models");
const User = db.user;
const Student = db.student;

exports.verifyStudent = async (req, res, next) => {
  const studentId = req.params.studentId;
  try {
    const student = await Student.findOne({
      where: {
        STU_ID: studentId,
      },
    });

    if (!student) {
      return res.status(400).send({
        message: "There's no student with this ID",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "There's something wrong",
    });
  }
  next();
};
