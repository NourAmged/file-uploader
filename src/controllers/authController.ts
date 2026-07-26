import { validationResult, matchedData } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { registerUser } from "../db/queries.js";

// import passport from "../config/passport.js";
async function addUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      errors: errors.array(),
    });
  }

  const data = matchedData(req);

  try {
    await registerUser(data);
    res.redirect("/");
  } catch (error: any) {
    return res.status(400).render("register", {
      errors: [{ msg: error.message }],
    });
  }
}

function loginUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("login", {
      errors: errors.array(),
    });
  }

  const data = matchedData(req);
}

export { addUser, loginUser };
