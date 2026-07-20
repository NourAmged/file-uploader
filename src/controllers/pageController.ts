import { Request, Response, NextFunction } from "express";

function homepage(req: Request, res: Response, next: NextFunction) {
  res.render("homepage");
}

export { homepage };
