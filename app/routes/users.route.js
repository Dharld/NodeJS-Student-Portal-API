const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/verifyUser.middleware");
const {
  getProfile,
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");
const { verifyAdmin } = require("../middlewares/verifyAdmin.middleware");
const { checkRole } = require("../middlewares/checkRole.middleware");

// define the home page route

router
  .route("/:id")
  .get(verifyUser, getProfile)
  .delete(verifyUser, verifyAdmin, deleteUser)
  .put(verifyUser, verifyAdmin, updateUser);

router
  .route("/")
  .post(verifyAdmin, checkRole, createUser)
  .get(verifyAdmin, getUsers);

module.exports = router;
