import joi from 'joi';
import bcrypt from "bcrypt";

export const signUp = async (req,res) => {
    const {name, email, password} = res.locals.signup;

    try{
        //busca no DB se usuário já existe
        const passwordHash = bcrypt.hashSync(password, 10);
        //query para salvar no banco
    } catch(error) {
        res.status(500).send(error);
    }
};

export const signIn = async (req,res) => {
    //gerar token MIDDLEWARES
};
