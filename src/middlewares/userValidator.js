import userSchema from './../schemas/userSchema.js';

export const validateUser = (req,res, next) => {
    const user = req.body;

    const validation = userSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details);
    };
    
    if(user.password !== user.confirmPassword){
        return res.status(422).send("Confirmação de senha incorreta");
    };

    res.locals.signup = user;
    next();
};