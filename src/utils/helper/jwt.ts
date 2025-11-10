import jwt from "jsonwebtoken";
import { envConfig } from "../../config/envConfig";

const JWT_SECRET = envConfig.JWT_SECRET;
const JWT_EXPIRES_IN = envConfig.JWT_EXPIRES_IN;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};