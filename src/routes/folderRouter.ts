import { Router } from "express";

import { isAuthorized, isLoggedIn } from "../controllers/authController.js";

import { createFolder, deleteFolder } from "../controllers/folderController.js";

const folderRouter = Router({ mergeParams: true });

folderRouter.post("/", isLoggedIn, createFolder);
folderRouter.post("/create-folder", isLoggedIn, createFolder);

folderRouter.get("/:folderId", isLoggedIn, isAuthorized, deleteFolder);

export { folderRouter };
