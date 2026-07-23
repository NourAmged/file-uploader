import { body } from "express-validator";

const validateUserRegister = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("username should be 3 to 12 characters long")
    .isAlphanumeric()
    .withMessage(
      "username should only contains numerical and alphabetical values",
    ),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should at least 8 characters long"),

  body("confirm-password").custom((value: String, { req }) => {
    if (value !== req.body.password)
      throw new Error("Passwords does not match");
    return true;
  }),
];

const validateUserLogin = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Incorrect username")
    .isAlphanumeric()
    .withMessage("Incorrect username"),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Incorrect Password"),
];
export { validateUserRegister, validateUserLogin };
