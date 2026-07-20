import { Router } from "express";
import { homepage } from "../controllers/pageController";

const indexRouter = Router();

indexRouter.get("/", homepage);

export { indexRouter };
