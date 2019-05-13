import passport from "passport";
import User from "./Models/User";

passport.use(User.createStrategy());

// Short Cut Passport Local Mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
