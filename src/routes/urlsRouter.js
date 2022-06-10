import express from 'express';
import { shortener,
         getURL,
        openURL,
        deleteURL} from '../controllers/urlsController.js';    

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten', shortener);
urlsRouter.get('/urls/:id', getURL);
urlsRouter.get('/urls/open/:shortUrl', openURL);
urlsRouter.delete('/urls/:id', deleteURL);

export default urlsRouter;