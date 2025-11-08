import jwt from "jsonwebtoken";

const generateToken = (userId: string, userEmail: string) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  if(!JWT_SECRET) {
	    throw new Error("JWT_SECRET не задан в переменных окружения");

  }

  return jwt.sign(
    {
      user: userId,
      email: userEmail,
    },
    JWT_SECRET,
    {
      expiresIn: "7h",
    }
  );
};

export default generateToken;
