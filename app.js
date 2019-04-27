import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieparser from 'cookie-parser';
import bodyparser from 'body-parser';
import { localmiddleware } from './middlewares';
import routes from './routes';
import userRouter from './Router/userRouter';
import videoRouter from './Router/videoRouter';
import globalRouter from './Router/globalRouter';

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/upload", express.static("upload"));
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use(localmiddleware);

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);


export default app;