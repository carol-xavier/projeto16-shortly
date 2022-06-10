import db from './../config/db.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  const { name, email, password } = res.locals.signup;
  
  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    
    await db.query(`
          INSERT INTO users (name, email, "passwordHash") 
          VALUES ($1, $2, $3);
        `, [name, email, passwordHash]);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  };
};

export const signIn = async (req, res) => {
  const { email } = res.locals.signin;
  const secretKey = process.env.JWT_SECRET;

  const session = { email };
  const setting = { expiresIn: 60 * 60 * 2 }
  const token = jwt.sign(session, secretKey, setting);

  return res.status(200).send({ token });
};
