const { check } = require("express-validator")

exports.userSignUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Enter valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Enter password of atleast 8 characters"),
]

exports.userSignInValidator = [
  check("email")
    .isEmail()
    .withMessage("Enter valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Enter password of atleast 8 characters"),
]
