const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const userController = require("../controlers/user");

router.post(
  "/signup",
  [
    body("name")
      .isLength({ min: 1 })
      .trim()
      .withMessage("name is wrong"),
    body("email").isEmail().withMessage("email is wrong"),
    body("password")
      .isLength({ min: 1 })
      .trim()
      .withMessage("name is wrong"),
  ],
  userController.postSignup
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("email is wrong"),
    body("password")
      .isLength({ min: 1 })
      .trim()
      .withMessage("password is wrong"),
  ],
  userController.postLogin
);

module.exports = router;
