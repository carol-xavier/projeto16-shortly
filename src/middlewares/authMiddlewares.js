
export const userValidation = (req,res, next) => {
    const {name, email, password, confirmPassword} = req.body;

    const user = {
        name,
        email,
        password,
        confirmPassword
    };

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required()
      });

    const validation = userSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details);
    };
    
    if(password !== confirmPassword){
        return res.status(422).send("Confirmação de senha incorreta");
    };

    res.locals.signup = user;
    next();
};