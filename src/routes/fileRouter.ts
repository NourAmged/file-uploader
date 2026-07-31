import { Router } from "express";
import {
  uploadFile,
  upload,
  downloadFile,
  deleteFile,
} from "../controllers/fileController.js";
import { isAuthorized, isLoggedIn } from "../controllers/authController.js";

const fileRouter = Router({ mergeParams: true });

fileRouter.post("/", isLoggedIn, upload.single("file"), uploadFile);

fileRouter.get("/", isLoggedIn, isAuthorized, downloadFile);
fileRouter.get("/delete", isLoggedIn, isAuthorized, deleteFile);

export { fileRouter };
