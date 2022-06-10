import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { userValidation } from '../middlewares/authMiddlewares.js';

const authRouter = express.Router();

authRouter.post('/signup', userValidation, signUp);
authRouter.post('/signin', signIn);

export default authRouter;