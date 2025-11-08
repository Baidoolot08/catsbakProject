import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId)
      return res.status(400).json({ success: false, message: "userId не передан" });

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
    const { catId, userId } = req.params;
    if (!catId || !userId)
      return res.status(400).json({ success: false, message: "catId или userId не переданы" });

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
    const { catId, userId } = req.body;
    if (!catId || !userId)
      return res.status(400).json({ success: false, message: "catId или userId не переданы" });

    // Проверка пользователя
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return res.status(404).json({ success: false, message: "Пользователь не найден" });

    // Проверка кота
    const cat = await prisma.cats.findUnique({ where: { id: catId } });
    if (!cat)
      return res.status(404).json({ success: false, message: "Кот не найден" });

    // Проверка на дубликат
    const existing = await prisma.favorite.findUnique({
      where: { userId_catId: { userId, catId } },
    });
    if (existing)
      return res.status(400).json({ success: false, message: "Кот уже в избранном" });

    // Создание связи через connect
    const favorite = await prisma.favorite.create({
      data: {
        user: { connect: { id: userId } },
        cat: { connect: { id: catId } },
      },
    });

    res.status(201).json({ success: true, message: "Кот добавлен в избранное", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Ошибка: ${error}` });
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { catId, userId } = req.params;
    if (!catId || !userId)
      return res.status(400).json({ success: false, message: "catId или userId не переданы" });

    const deleted = await prisma.favorite.delete({
      where: { userId_catId: { userId, catId } },
    });

    res.status(200).json({ success: true, message: "Кот удален из избранного", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Ошибка: ${error}` });
  }
};

export default { getAllFavorites, getFavorite, addFavorite, removeFavorite };
