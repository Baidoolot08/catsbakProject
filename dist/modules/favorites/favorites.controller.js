"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAllFavorites = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId)
            return res.status(400).json({ success: false, message: "userId не передан" });
        const favorites = await prisma_1.default.favorite.findMany({
            where: { userId },
            include: { cat: true },
        });
        res.status(200).json({ success: true, favorites });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
};
const getFavorite = async (req, res) => {
    try {
        const { catId, userId } = req.params;
        if (!catId || !userId)
            return res.status(400).json({ success: false, message: "catId или userId не переданы" });
        const favorite = await prisma_1.default.favorite.findUnique({
            where: { userId_catId: { userId, catId } },
        });
        res.status(200).json({ success: true, favorite });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
};
const addFavorite = async (req, res) => {
    try {
        const { catId, userId } = req.body;
        if (!catId || !userId)
            return res.status(400).json({ success: false, message: "catId или userId не переданы" });
        // Проверка пользователя
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ success: false, message: "Пользователь не найден" });
        // Проверка кота
        const cat = await prisma_1.default.cats.findUnique({ where: { id: catId } });
        if (!cat)
            return res.status(404).json({ success: false, message: "Кот не найден" });
        // Проверка на дубликат
        const existing = await prisma_1.default.favorite.findUnique({
            where: { userId_catId: { userId, catId } },
        });
        if (existing)
            return res.status(400).json({ success: false, message: "Кот уже в избранном" });
        // Создание связи через connect
        const favorite = await prisma_1.default.favorite.create({
            data: {
                user: { connect: { id: userId } },
                cat: { connect: { id: catId } },
            },
        });
        res.status(201).json({ success: true, message: "Кот добавлен в избранное", favorite });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
};
const removeFavorite = async (req, res) => {
    try {
        const { catId, userId } = req.params;
        if (!catId || !userId)
            return res.status(400).json({ success: false, message: "catId или userId не переданы" });
        const deleted = await prisma_1.default.favorite.delete({
            where: { userId_catId: { userId, catId } },
        });
        res.status(200).json({ success: true, message: "Кот удален из избранного", deleted });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Ошибка: ${error}` });
    }
};
exports.default = { getAllFavorites, getFavorite, addFavorite, removeFavorite };
//# sourceMappingURL=favorites.controller.js.map