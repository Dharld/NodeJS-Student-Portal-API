const db = require("../models");
const Participate = db.participate;
const Evaluation = db.evaluation;
const Student = db.student;

exports.add = async (req, res) => {
  try {
    const { evalId, studentId } = req.query;

    const { mark: PART_MARK, appreciation: PART_APPRECIATION } = req.body;

    const evaluation = await Evaluation.findOne({
      where: {
        EVAL_ID: evalId,
      },
    });

    const student = await Student.findOne({
      where: {
        STU_ID: studentId,
      },
    });
    if (!student || !evaluation) {
      return res.status(500).send({
        success: false,
        message: "There's no student nor evaluation with the provided id.",
      });
    }

    const values = {
      STU_ID: student.dataValues.STU_ID,
      EVAL_ID: evaluation.dataValues.EVAL_ID,
      PART_MARK,
      PART_APPRECIATION,
    };

    const participate = await Participate.create(values);

    console.log(participate);

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
