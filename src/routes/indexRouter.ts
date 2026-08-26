import { Router } from "express";
import { homepage } from "../controllers/pageController.js";
import { isAuthorized, isLoggedIn } from "../controllers/authController.js";

const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", isLoggedIn, homepage);
indexRouter.get("/:folderId", isLoggedIn, isAuthorized, homepage);

export { indexRouter };
