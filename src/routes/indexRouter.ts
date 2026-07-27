import { Router } from "express";
import { homepage } from "../controllers/pageController.js";
import { isLoggedIn } from "../controllers/authController.js";

const indexRouter = Router();

indexRouter.get("/", isLoggedIn, homepage);

export { indexRouter };
