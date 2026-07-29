import { Request, Response, NextFunction } from "express";
import { getFilesById } from "../db/queries.js";

async function homepage(req: Request, res: Response, next: NextFunction) {
  const user = req.user as { id: number };
  const userId = user.id;

  const files = await getFilesById(userId);

  res.render("homepage", { user: req.user, files: files });
}

function loginPage(req: Request, res: Response, next: NextFunction) {
  res.render("login");
}

function registerPage(req: Request, res: Response, next: NextFunction) {
  res.render("register");
}

export { homepage, loginPage, registerPage };
