import { NextFunction, Request, Response } from "express";
import { verufuToken } from "../config/token";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Токен не предоставлен" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verufuToken(token);

    if (!decoded?.userId) {
      return res.status(403).json({ message: "Недействительный токен" });
    }
    (req as any).user = decoded; 
    next();
  } catch (error: any) {
    console.error("Ошибка проверки токена:", error.message);
    return res.status(403).json({ message: "Недействительный или истёкший токен" });
  }
};

export default authMiddleware;
