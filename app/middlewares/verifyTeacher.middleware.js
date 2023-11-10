const db = require("../models");
const Teacher = db.teacher;

exports.verifyTeacher = async (req, res, next) => {
  const { teacher_id } = req.body;

  // We are creating a course without a teacher
  if (!teacher_id) {
    next();
  }

  try {
    const user = await Teacher.findOne({
      where: {
        TEACHER_ID: teacher_id,
      },
    });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "This user isn't a teacher",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "There's something wrong",
    });
  }
  next();
};
