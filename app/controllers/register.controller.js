const db = require("../models");
const User = db.user;
const Student = db.student;
const Course = db.course;
const Register = db.register;
const Op = db.Op;

exports.add = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { courseId } = req.body;

    const student = await Student.findOne({ where: { STU_ID: studentId } });
    const course = await Course.findOne({ where: { COURSE_ID: courseId } });

    console.log(student);
    console.log(course);

    if (!student || !course) {
      return res.status(500).send({
        success: false,
        reason: "There's no course or student with your ids.",
      });
    }

    await student.addCourse(course, {
      through: {
        COURSE_ID: courseId,
        STU_ID: studentId,
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

exports.getAll = async (req, res) => {
  try {
    const registrations = await Register.findAll();
    const rMapped = registrations.map((r) => r.dataValues);
    return res.status(200).send({
      success: true,
      data: rMapped,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

exports.validateRequest = async (req, res) => {
  const { studentId, courseId } = req.params;
  const { regStatus } = req.body;
  if (!regStatus) {
    return res.status(500).send({
      success: false,
      reason: "You must provide a registration status.",
    });
  }
  if (!["PENDING", "ACCEPTED", "REJECTED"].includes(regStatus)) {
    return res.status(500).send({
      success: false,
      reason:
        "You must provide a valid registration status (PENDING, ACCEPTED, REJECTED).",
    });
  }
  try {
    const registration = await Register.findOne({
      STU_ID: studentId,
      COURSE_ID: courseId,
    });
    await registration.update({
      REG_STATUS: regStatus,
    });
    return res.status(500).send({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
