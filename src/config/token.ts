import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (userId: string, userEmail: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET не задан в переменных окружения");
  }

  return jwt.sign(
    {
      userId,      
      userEmail
    },
    JWT_SECRET,
    { expiresIn: "7h" }
  );
};

export default generateToken;

export const verufuToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; userEmail: string };
};
