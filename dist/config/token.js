"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, userEmail) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET не задан в переменных окружения");
    }
    return jsonwebtoken_1.default.sign({
        user: userId,
        email: userEmail,
    }, JWT_SECRET, {
        expiresIn: "7h",
    });
};
exports.default = generateToken;
//# sourceMappingURL=token.js.map