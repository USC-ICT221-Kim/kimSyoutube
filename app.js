import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import videoRouter from './Router/videoRouter';
import userRouter from './Router/userRouter';
import globalRouter from './Router/globalRouter';
import routes from './routes';

const app = express();

app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);


export default app;