import db from './../config/db.js';
import bcrypt from 'bcrypt';
import userSignInSchema from './../schemas/signinSchema.js';

export const validateUserSignIn = async (req, res, next) => {
    const user = req.body;

    const result = await db.query('SELECT "passwordHash" FROM users WHERE email = $1', [user.email]);
    
    if (result.rowCount === 0) {
        return res.status(401).send("Usuário não cadastrado");
    };

    const passwordValidation = bcrypt.compareSync(user.password, result.rows[0].passwordHash);
    if(!passwordValidation) return res.status(401).send("Senha incorreta");

    const validation = userSignInSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details);
    };

    res.locals.signin = user;
    next();
};