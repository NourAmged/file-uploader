import { Router } from "express";
import { loginPage, registerPage } from "../controllers/pageController.js";
import {
  addUser,
  loginUser,
  isLoggedOut,
  isLoggedIn,
  logoutUser,
} from "../controllers/authController.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../middlewares/userValidator.js";

const loginRouter = Router();
const registerRouter = Router();
const logoutRouter = Router();

loginRouter.get("/", isLoggedOut, loginPage);
registerRouter.get("/", isLoggedOut, registerPage);
logoutRouter.get("/", isLoggedIn, logoutUser);

registerRouter.post("/", validateUserRegister, addUser);
loginRouter.post("/", validateUserLogin, loginUser);

export { loginRouter, registerRouter, logoutRouter };
