import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_SECRET;
    
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.sendStatus(401);

  try {
    const session = await jwt.verify(token, secretKey);
    const {email} = session;
    res.locals.session = { email };
    
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};