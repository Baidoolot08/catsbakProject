import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { cat: true },
    });

    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Ошибка: ${error}` });
  }
};


const getFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { catId } = req.params;

    const favorite = await prisma.favorite.findUnique({
      where: { userId_catId: { userId, catId } },
    });

    res.status(200).json({ success: true, favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Ошибка: ${error}` });
  }
};

const addFavorite = async (req: Request, res: Response) => {
  try {
    const { catId } = req.body;
    const userId = (req as any).user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Требуется авторизация" });
    }

    if (!catId) {
      return res.status(400).json({ message: "catId не передан" });
    }

    const cat = await prisma.cats.findUnique({ where: { id: catId } });
    if (!cat) return res.status(404).json({ message: "Кот не найден" });

    const existing = await prisma.favorite.findUnique({
      where: { userId_catId: { userId, catId } },
    });
    if (existing) return res.status(400).json({ message: "Кот уже в избранном" });

    const favorite = await prisma.favorite.create({
      data: {
        user: { connect: { id: userId } },
        cat: { connect: { id: catId } },
      },
    });

    res.status(201).json({ success: true, message: "Кот добавлен в избранное", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Ошибка: ${error}` });
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { catId } = req.params;
    const userId = (req as any).user.userId;
    if (!userId) return res.status(401).json({ message: "Требуется авторизация" });
    if (!catId) return res.status(400).json({ message: "catId не передан" });

    const deleted = await prisma.favorite.delete({
      where: { userId_catId: { userId, catId } },
    });

    res.status(200).json({ success: true, message: "Кот удален из избранного", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Ошибка: ${error}` });
  }
};

export default { getAllFavorites, getFavorite, addFavorite, removeFavorite };
