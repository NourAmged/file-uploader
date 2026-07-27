import { validationResult, matchedData } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { registerUser } from "../db/queries.js";
import { IVerifyOptions } from "passport-local";

import { passport } from "../config/passport.js";

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

  passport.authenticate(
    "local",
    (err: Error, user: Express.User, info: IVerifyOptions) => {
      if (err) return next(err);

      if (!user) {
        return res.status(400).render("login", {
          errors: [{ msg: info.message }],
        });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    },
  )(req, res, next);
}

async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  req.logout((err: Error) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
}

async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/login");
}

async function isLoggedOut(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/");
}

export { addUser, loginUser, isLoggedIn, isLoggedOut, logoutUser };
