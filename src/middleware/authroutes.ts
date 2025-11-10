import express from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  const user = (req as any).user;
  res.json({ message: "Профиль пользователя", user });
});

export default router;
