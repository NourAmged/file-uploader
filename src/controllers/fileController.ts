import { Request, Response, NextFunction } from "express";
import { addFile, deleteFileById, getFilePathById } from "../db/queries.js";
import { unlink } from "node:fs/promises";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as { id: number };
    const userId = user.id;


    await addFile(userId, req.file!);

    return res.redirect("/");
  } catch (error: any) {
    return res.status(400).render("homepage", {
      errors: [{ msg: error.message }],
    });
  }
}

async function downloadFile(req: Request, res: Response, next: NextFunction) {
  const fileId = Number(req.params.fileId);
  const filePath = await getFilePathById(fileId);

  if (!filePath) {
    return res.status(404).send("File not found");
  }

  res.download(filePath.file_path, (err) => {
    if (err) {
      return next(err);
    }
  });
}

async function deleteFile(req: Request, res: Response, next: NextFunction) {
  try {
    const fileId = Number(req.params.fileId);
    const filePath = await getFilePathById(fileId);

    if (filePath === null) {
      res.status(404).send("File not found");
      return;
    }

    await unlink(filePath.file_path);
    await deleteFileById(fileId);

    return next();
  } catch (error) {
    next(error);
  }
}

export { uploadFile, upload, downloadFile, deleteFile };
