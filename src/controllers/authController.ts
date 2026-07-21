import { Request, Response, NextFunction } from "express";

function loginPage(req: Request, res: Response, next: NextFunction) {
  res.render("login");
}

function registerPage(req: Request, res: Response, next: NextFunction) {
  res.render("register");
}

export { loginPage, registerPage };
