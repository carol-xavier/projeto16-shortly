import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateUserSignUp } from '../middlewares/signupValidator.js';
import { validateUserSignIn } from '../middlewares/signinValidator.js';

const authRouter = express.Router();

authRouter.post('/signup', validateUserSignUp, signUp);
authRouter.post('/signin', validateUserSignIn, signIn);

export default authRouter;