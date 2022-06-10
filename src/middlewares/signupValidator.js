import db from './../config/db.js';
import userSignUpSchema from '../schemas/signupSchema.js';

export const validateUserSignUp = async (req,res, next) => {
    const user = req.body;

    const validation = userSignUpSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details);
    };
    
    if(user.password !== user.confirmPassword){
        return res.status(422).send("Confirmação de senha incorreta");
    };

    try{
        const result = await db.query('SELECT id FROM users WHERE email = $1', [user.email]);
        if (result.rowCount > 0) {
          return res.status(422).send("Usuário já cadastrado");
        };
    }catch(error){
        return res.status(500).send(error);
    };

    res.locals.signup = user;
    next();
};