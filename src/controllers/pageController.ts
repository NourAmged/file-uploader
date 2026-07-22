import { Request, Response, NextFunction } from "express";

function homepage(req: Request, res: Response, next: NextFunction) {
  res.render("homepage");
}

function loginPage(req: Request, res: Response, next: NextFunction) {
  res.render("login");
}

function registerPage(req: Request, res: Response, next: NextFunction) {
  res.render("register");
}

export { homepage, loginPage, registerPage };
