import { Router } from "express";
import { homepage } from "../controllers/pageController.js";
import { isLoggedIn } from "../controllers/authController.js";

const indexRouter = Router();

indexRouter.get("/", isLoggedIn, homepage);
indexRouter.get("/:folderId", isLoggedIn, homepage);


export { indexRouter };
