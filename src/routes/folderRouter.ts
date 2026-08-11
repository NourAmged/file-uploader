import { Router } from "express";

import { isAuthorized, isLoggedIn } from "../controllers/authController.js";

import { createFolder } from "../controllers/folderController.js";

const folderRouter = Router({ mergeParams: true });

folderRouter.post("/", isLoggedIn, createFolder);

export { folderRouter };



