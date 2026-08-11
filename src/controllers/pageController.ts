import { Request, Response, NextFunction } from "express";
import { getFilesById, getFolderById } from "../db/queries.js";

async function homepage(req: Request, res: Response, next: NextFunction) {
  const user = req.user as { id: number };
  const userId = user.id;

  const files = await getFilesById(userId);
  const folders = await getFolderById(userId);

  return res.render("homepage", {
    user: req.user,
    files: files,
    folders: folders,
  });
}

function loginPage(req: Request, res: Response, next: NextFunction) {
  return res.render("login");
}

function registerPage(req: Request, res: Response, next: NextFunction) {
  return res.render("register");
}

export { homepage, loginPage, registerPage };
