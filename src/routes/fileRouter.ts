import { Router } from "express";
import { uploadFile, upload } from "../controllers/fileController.js";
import { isLoggedIn } from "../controllers/authController.js";

const fileRouter = Router();

fileRouter.post("/", isLoggedIn, upload.single("file"), uploadFile);

export { fileRouter };
