import express from 'express';
import { getUser, getRanking } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/users/:id', getUser);
usersRouter.get('/ranking', getRanking);

export default usersRouter;