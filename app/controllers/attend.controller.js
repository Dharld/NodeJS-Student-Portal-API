const db = require("../models");
const Student = db.student;
const Class = db.class;

exports.addRecord = async (req, res) => {
  try {
    const { studentId, classId } = req.query;
    const { attendStatus } = req.body;

    const student = await Student.findOne({
      where: {
        STU_ID: studentId,
      },
    });
    const class_ = await Class.findOne({
      where: {
        CLASS_ID: classId,
      },
    });

    if (!student || !class_) {
      return res.status(500).send({
        success: false,
        message: "There's no student nor course with the provided id.",
      });
    }

    await student.addClass(class_, {
      through: {
        CLASS_ID: classId,
        STU_ID: studentId,
        ATTEND_STATUS: attendStatus,
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
