import express,{json} from 'express';
import cors from 'cord';
import dotenv from 'dotenv';
dotenv.config();

const app = express().use(cors()).use(json());

const port = process.env.PORT || 5000;

app.listen(port);
