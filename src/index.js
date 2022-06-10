import express,{json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRouter.js';
import urlsRouter from './routes/urlsRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express().use(cors()).use(json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

const port = process.env.PORT || 5000;

app.listen(port);
