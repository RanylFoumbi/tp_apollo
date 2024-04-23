import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export type JWTUser = {
    id: number;
    username: string;
};
 
export const createJWT = (user: JWTUser): string => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
  );
  return token;
};

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
    };

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 5);
}

export const getUser = (token: string): JWTUser | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser;
    return payload;
  } catch (error) {
    return null;
  }
};