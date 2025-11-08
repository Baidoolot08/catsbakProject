"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorites_controller_1 = __importDefault(require("./favorites.controller"));
const routes = (0, express_1.Router)();
routes.get("/all/:userId", favorites_controller_1.default.getAllFavorites);
routes.get("/check/:userId/:catId", favorites_controller_1.default.getFavorite);
routes.post("/add", favorites_controller_1.default.addFavorite);
routes.delete("/remove/:userId/:catId", favorites_controller_1.default.removeFavorite);
exports.default = routes;
//# sourceMappingURL=favorites.routes.js.map