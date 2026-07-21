import { Router } from "express";
import { loginPage, registerPage } from "../controllers/authController.js";

const loginRouter = Router();
const registerRouter = Router();

loginRouter.get("/", loginPage);
registerRouter.get("/", registerPage);

export { loginRouter, registerRouter };
