import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./Models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

    passport.use(new GithubStrategy({
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
          }, githubLoginCallback));
         

// Short Cut Passport Local Mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
