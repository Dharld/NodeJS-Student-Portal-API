const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { checkEmail } = require("../middlewares/checkEmail.middleware");

// define the home page route
router.post("/signup", signup);
router.post("/login", checkEmail, login);

module.exports = router;
