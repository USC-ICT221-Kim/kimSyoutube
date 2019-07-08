import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieparser from 'cookie-parser';
import bodyparser from 'body-parser';
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import mongoStore from "connect-mongo";
import { localmiddleware } from './middlewares';
import routes from './routes';
import userRouter from './Router/userRouter';
import videoRouter from './Router/videoRouter';
import globalRouter from './Router/globalRouter';
import apiRouter from './Router/apiRouter';

import "./passport";


const app = express();

const CookieStore = mongoStore(session);

// eslint-disable-next-line no-console
console.log(process.env.COOKIE_SECRET);

app.use(helmet());
app.set("view engine", "pug");
app.use("/upload", express.static("upload"));
app.use("/statistic", express.static("statistic"));
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use
    (session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({mongooseConnection: mongoose.connection})
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localmiddleware);

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);
app.use(routes.api, apiRouter);


export default app;