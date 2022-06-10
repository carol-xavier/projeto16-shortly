import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateUser } from '../middlewares/userValidator.js';

const authRouter = express.Router();

authRouter.post('/signup', validateUser, signUp);
authRouter.post('/signin', signIn);

export default authRouter;