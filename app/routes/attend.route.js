const express = require("express");
const { addRecord } = require("../controllers/attend.controller");
const router = express.Router();

router.post("/", addRecord);

module.exports = router;
