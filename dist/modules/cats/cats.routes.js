"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cats_controllers_1 = __importDefault(require("./cats.controllers"));
const routes = (0, express_1.Router)();
routes.get("/all", cats_controllers_1.default.getAllCats);
routes.get("/get-one/:catId", cats_controllers_1.default.getOneCat);
routes.post("/", cats_controllers_1.default.createCatCard);
routes.delete("/delete/:catId", cats_controllers_1.default.deleteCatCard);
routes.put("/update/:catId", cats_controllers_1.default.updateCat);
exports.default = routes;
//# sourceMappingURL=cats.routes.js.map