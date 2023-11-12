const db = require("../models");
const User = db.user;
const Student = db.student;
const Course = db.course;
const Register = db.register;
const Op = db.Op;

exports.register = async (req, res) => {
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
    console.log(registrations);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
