import express,{json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRouter.js';

const app = express().use(cors()).use(json());

app.use(authRouter);

const port = process.env.PORT || 5000;

app.listen(port);
