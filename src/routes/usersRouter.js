import express from 'express';
import { getUser, getRanking } from '../controllers/usersController.js';
import { validateToken } from './../middlewares/tokenValidator.js';

const usersRouter = express.Router();

usersRouter.get('/users/:id', validateToken, getUser);
usersRouter.get('/ranking', getRanking);

export default usersRouter;