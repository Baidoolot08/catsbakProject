"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAllCats = async (req, res) => {
    try {
        const cats = await prisma_1.default.cats.findMany();
        res.status(200).json({ success: true, cats });
    }
    catch (error) {
        res.status(500).json({ success: false, error: `Ошибка: ${error}` });
    }
};
const getOneCat = async (req, res) => {
    try {
        const catId = req.params.catId;
        if (!catId)
            return res
                .status(400)
                .json({ success: false, message: "ID кота не передан" });
        const cat = await prisma_1.default.cats.findUnique({ where: { id: catId } });
        if (!cat)
            return res.status(404).json({ success: false, message: "Кот не найден" });
        res.status(200).json({ success: true, cat });
    }
    catch (error) {
        res.status(500).json({ success: false, error: `Ошибка: ${error}` });
    }
};
const createCatCard = async (req, res) => {
    try {
        const { image, price, age, paws, name, color, sale } = req.body;
        if (!image || !price || !paws || !name || !color || !age) {
            return res
                .status(400)
                .json({ success: false, message: "Заполните все поля" });
        }
        const existingCat = await prisma_1.default.cats.findFirst({
            where: { name, color, age: Number(age) },
        });
        if (existingCat)
            return res
                .status(400)
                .json({ success: false, message: "Кот уже существует" });
        const newCat = await prisma_1.default.cats.create({
            data: {
                image,
                price: Number(price),
                age: Number(age),
                paws: Number(paws),
                name,
                color,
                sale: Number(sale) || 0,
            },
        });
        res.status(201).json({ success: true, message: "Кот добавлен", newCat });
    }
    catch (error) {
        res.status(500).json({ success: false, error: `Ошибка: ${error}` });
    }
};
const deleteCatCard = async (req, res) => {
    try {
        const catId = req.params.catId;
        if (!catId)
            return res
                .status(400)
                .json({ success: false, message: "ID кота не передан" });
        const deletedCat = await prisma_1.default.cats.delete({ where: { id: catId } });
        res.status(200).json({ success: true, message: "Кот удалён", deletedCat });
    }
    catch (error) {
        res.status(500).json({ success: false, error: `Ошибка: ${error}` });
    }
};
const updateCat = async (req, res) => {
    try {
        const catId = req.params.catId;
        if (!catId)
            return res
                .status(400)
                .json({ success: false, message: "ID кота не передан" });
        const { image, price, age, paws, name, color, sale } = req.body;
        const updated = await prisma_1.default.cats.update({
            where: { id: catId },
            data: {
                ...(image && { image }),
                ...(price && { price: Number(price) }),
                ...(age && { age: Number(age) }),
                ...(paws && { paws: Number(paws) }),
                ...(name && { name }),
                ...(color && { color }),
                ...(sale && { sale: Number(sale) }),
            },
        });
        res.status(200).json({ success: true, message: "Кот обновлён", updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: `Ошибка: ${error}` });
    }
};
exports.default = {
    getAllCats,
    getOneCat,
    createCatCard,
    deleteCatCard,
    updateCat,
};
//# sourceMappingURL=cats.controllers.js.map