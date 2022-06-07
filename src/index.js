import express,{json} from 'express';
import cors from 'cord';
import dotenv from 'dotenv';
dotenv.config();

const app = express().use(cors()).use(json());
