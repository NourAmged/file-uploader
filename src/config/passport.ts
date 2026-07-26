import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

import { getUserById, getUserByUsername } from "../db/queries.js";

passport.use(
  new LocalStrategy.Strategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user: any, done) => {
  // TODO: fix type
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export { passport };
