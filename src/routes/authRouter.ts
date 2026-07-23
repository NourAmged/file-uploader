import { Router } from "express";
import { loginPage, registerPage } from "../controllers/pageController.js";
import { addUser, loginUser } from "../controllers/authController.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../middlewares/userValidator.js";

const loginRouter = Router();
const registerRouter = Router();

loginRouter.get("/", loginPage);
registerRouter.get("/", registerPage);

registerRouter.post("/", validateUserRegister, addUser);
loginRouter.post("/", validateUserLogin, loginUser);

export { loginRouter, registerRouter };
