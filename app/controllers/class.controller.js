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

    if (!course) {
      return res.status(500).send({
        status: 500,
        reason: "There's no course with the specified id",
      });
    }

    /*  const class_ = await Class.create({
      CLASS_ROOM,
      CLASS_TIME,
    });
 */

    console.log(course);

    await course.createClass({
      CLASS_ROOM,
      CLASS_TIME,
    });

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
