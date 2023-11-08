const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth.controller");

// define the home page route
router.post("/signup", signup);

module.exports = router;
