const db = require("../models");
const Evaluation = db.evaluation;
const Course = db.course;

exports.add = async (req, res) => {
  const { courseId } = req.query;

  try {
    const course = await Course.findOne({
      where: {
        COURSE_ID: courseId,
      },
    });

    if (!course) {
      return res.status(500).send({
        success: false,
        reason: "There's no course with the specified id.",
      });
    }

    const { type: EVAL_TYPE, weight: EVAL_WEIGHT, name: EVAL_NAME } = req.body;

    await course.createEvaluation({
      EVAL_TYPE,
      EVAL_WEIGHT,
      EVAL_NAME,
      COURSE_ID: courseId,
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

exports.update = async (req, res) => {
  try {
    const evalId = req.params.id;
    const { type: EVAL_TYPE, weight: EVAL_WEIGHT, name: EVAL_NAME } = req.body;
    await Evaluation.update(
      { EVAL_TYPE, EVAL_WEIGHT, EVAL_NAME },
      {
        where: {
          EVAL_ID: evalId,
        },
      }
    );
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
