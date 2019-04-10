import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import videoRouter from './Router/videoRouter';
import userRouter from './Router/userRouter';
import globalRouter from './Router/globalRouter';
import route from './route';

const app = express();

app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use(route.users, userRouter);
app.use(route.video, videoRouter);


export default app;