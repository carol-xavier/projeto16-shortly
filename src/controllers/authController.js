import db from './../config/db.js';
import bcrypt from "bcrypt";

export const signUp = async (req,res) => {
    const {name, email, password} = res.locals.signup;

    try{        
        const result = await db.query('SELECT id FROM users WHERE email = $1', [email]);
        if (result.rowCount > 0) {
          return res.status(422).send("Usuário já cadastrado");
        };

        const passwordHash = bcrypt.hashSync(password, 10);
 
        await db.query(`
          INSERT INTO users (name, email, "passwordHash") 
          VALUES ($1, $2, $3);
        `, [name, email, passwordHash]);

        res.sendStatus(201);
    } catch(error) {
        res.status(500).send(error);
    }
};

export const signIn = async (req,res) => {
    //gerar token MIDDLEWARES
};
