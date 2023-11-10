const db = require("../models");
const User = db.user;
const Teacher = db.teacher;
const Course = db.course;
const Op = db.Op;

exports.createCourse = async (req, res) => {
  try {
    const {
      name: COURSE_NAME,
      description: COURSE_DESC,
      code: COURSE_CODE,
      status: COURSE_STATUS,
      teacher_id: TEACHER_ID,
    } = req.body;

    const course = await Course.create({
      COURSE_NAME,
      COURSE_DESC,
      COURSE_CODE,
      COURSE_STATUS,
      TEACHER_ID,
      teacherTEACHERID: TEACHER_ID,
    });

    return res.status(200).send({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findOne({
      where: {
        COURSE_ID: courseId,
      },
    });

    if (!course) {
      return res.status(500).send({
        success: false,
        message: "There's no course with the specified ID",
      });
    }
    return res.status(200).send({
      sucess: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.status(200).send({
      sucess: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    await Course.destroy({
      where: {
        COURSE_ID: courseId,
      },
    });
    return res.status(200).send({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCourse = (req, res) => {};
