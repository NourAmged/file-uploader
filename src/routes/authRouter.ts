import { Router } from "express";
import { loginPage, registerPage } from "../controllers/pageController.js";
import { addUser } from "../controllers/authController.js";
import { validateUserRegister } from "../middlewares/userValidator.js";

const loginRouter = Router();
const registerRouter = Router();

loginRouter.get("/", loginPage);
registerRouter.get("/", registerPage);

registerRouter.post("/", validateUserRegister, addUser);

export { loginRouter, registerRouter };
