const express = require("express");
const {
  add,
  getAll,
  get,
  validateRequest,
} = require("../controllers/register.controller");
const { verifyStudent } = require("../middlewares/verifyStudent.middleware");
const { verifyAdmin } = require("../middlewares/verifyAdmin.middleware");
const router = express.Router();

router.post("/:studentId", verifyStudent, add);
router.get("/", verifyAdmin, getAll);
router.put("/:studentId/:courseId", verifyAdmin, validateRequest);

module.exports = router;
