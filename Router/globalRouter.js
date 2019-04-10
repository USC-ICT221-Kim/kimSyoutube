import express from 'express';
import routes from '../routes';
import { home, search } from '../Controller/videoController';
import { join, logout, login } from '../Controller/userController';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;