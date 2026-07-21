import { Router } from "express";
import { homepage } from "../controllers/pageController.js";

const indexRouter = Router();

indexRouter.get("/", homepage);

export { indexRouter };
