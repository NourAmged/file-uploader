import { Request, Response, NextFunction } from "express";
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

function uploadFile(req: Request, res: Response, next: NextFunction) {
  console.log(req.file);
  res.redirect("/");
}

export { uploadFile, upload };
