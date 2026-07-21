import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy.Strategy(async (username, password, done) => {
    try {
      // const user = await getUser(username) //TO DO
      // if(!user){
      //   return done(null, false, {message:"Incorrect username"});
      // }
      // const match = await bcrypt.compare(password, user.password);
      // if(!match){
      //   return done(null, false, {message:"Incorrect password"});
      // }
      //return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

passport.deserializeUser(async (id, done) => {
  try {
    //const user = await getUserById(id);
    //done(null, user);
  } catch (err) {
    done(err);
  }
});
