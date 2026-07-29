import { Request, Response, NextFunction } from "express";
import { addFile } from "../db/queries.js";
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

    await addFile(userId, req.file);

    res.redirect("/");
  } catch (error: any) {
    return res.status(400).render("homepage", {
      errors: [{ msg: error.message }],
    });
  }
}

export { uploadFile, upload };
