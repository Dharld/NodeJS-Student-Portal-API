const db = require("../models");
const Course = db.course;
const Class = db.class;
const Op = db.Op;

exports.add = async (req, res) => {
  const { room: CLASS_ROOM, time: CLASS_TIME } = req.body;
  try {
    const courseId = req.query.courseId;
    const course = await Course.findOne({
      COURSE_ID: courseId,
    });
    const class_ = await Class.create({
      CLASS_ROOM,
      CLASS_TIME,
    });

    await course.addClass(class_);

    return res.status(200).send({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
