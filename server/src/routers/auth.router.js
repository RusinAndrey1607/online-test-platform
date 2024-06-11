const express = require("express");
const { check } = require("express-validator");
const authController  = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post(
  "/registration",
  [
    check("email").isEmail(),
    check("password")
      .isLength({ min: 5, max: 32 })
      .withMessage("Password must contain at least 5 chars and cannot be longer than 32"),
  ],
  authController.registration
);

authRouter.post(
  "/login",
  [
    check("email").isEmail(),
    check("password")
      .isLength({ min: 5, max: 32 })
      .withMessage("Password must contain at least 5 chars and cannot be longer than 32"),
  ],
  authController.login
);
authRouter.get('/check', authController.checkAuth);

module.exports = authRouter;
