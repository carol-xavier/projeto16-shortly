import express from 'express';
import { validateToken } from '../middlewares/tokenValidator.js';

import {
        shortener,
        getURL,
        openURL,
        deleteURL
} from '../controllers/urlsController.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten', validateToken, shortener);
urlsRouter.get('/urls/:id', getURL);
urlsRouter.get('/urls/open/:shortUrl', openURL);
urlsRouter.delete('/urls/:id', validateToken, deleteURL); 

export default urlsRouter;