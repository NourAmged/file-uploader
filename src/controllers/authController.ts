import { validationResult, matchedData } from "express-validator";
import { Request, Response, NextFunction } from "express";

// import passport from "../config/passport.js";
function addUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      errors: errors.array(),
    });
  }

  const data = matchedData(req);

}

export { addUser };
