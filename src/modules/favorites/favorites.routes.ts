import { Router } from "express";
import favoritesController from "./favorites.controller";
import authMiddleware from "../../middleware/authMiddleware";

const routes = Router();

routes.get("/all", authMiddleware, favoritesController.getAllFavorites);
routes.get("/check/:catId", authMiddleware, favoritesController.getFavorite);
routes.post("/add", authMiddleware, favoritesController.addFavorite);
routes.delete("/remove/:catId", authMiddleware, favoritesController.removeFavorite);

export default routes;
