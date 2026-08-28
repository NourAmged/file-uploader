import { Router } from "express";

import { isAuthorized, isLoggedIn } from "../controllers/authController.js";

import {
  createFolder,
  deleteFolder,
  downloadFolder,
} from "../controllers/folderController.js";

const folderRouter = Router({ mergeParams: true });

folderRouter.post("/", isLoggedIn, createFolder);
folderRouter.post("/:folderId/create-folder", isLoggedIn, createFolder);

folderRouter.get(
  "/download/:folderId",
  isLoggedIn,
  isAuthorized,
  downloadFolder,
);
folderRouter.get("/delete/:folderId", isLoggedIn, isAuthorized, deleteFolder);

export { folderRouter };
