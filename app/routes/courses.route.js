const express = require("express");
const { verifyAdmin } = require("../middlewares/verifyAdmin.middleware");
const {
  createCourse,
  getCourse,
  getCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courses.controller");

const router = express.Router();

router.route("/").post(verifyAdmin, createCourse).get(getCourses);

router
  .route("/:id")
  .put(verifyAdmin, updateCourse)
  .delete(verifyAdmin, deleteCourse)
  .get(getCourse);

module.exports = router;
