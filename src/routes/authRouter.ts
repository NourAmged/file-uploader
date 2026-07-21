import { Router } from "express";
import { loginPage } from "../controllers/authController.js";

const loginRouter = Router();

loginRouter.get("/", loginPage);

export { loginRouter };
