const express = require("express");
const { add } = require("../controllers/participate.controller");
const router = express.Router();

router.post("/", add);

module.exports = router;
