"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const cats_routes_1 = __importDefault(require("../cats/cats.routes"));
const favorites_routes_1 = __importDefault(require("../favorites/favorites.routes"));
const globalRouter = (0, express_1.Router)();
const corsconfig = {
    origin: ["http://localhost:3000"],
};
globalRouter.use("/auth", (0, cors_1.default)(corsconfig), auth_routes_1.default);
globalRouter.use("/cats", (0, cors_1.default)(corsconfig), cats_routes_1.default);
globalRouter.use("/favorites", (0, cors_1.default)(corsconfig), favorites_routes_1.default);
exports.default = globalRouter;
//# sourceMappingURL=index.js.map