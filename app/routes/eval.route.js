const express = require("express");
const { add, update } = require("../controllers/eval.controller");
const router = express.Router();

router.post("/", add);
router.put("/:id", update);

module.exports = router;
