import { Router } from "express";
import favoritesController from "./favorites.controller";

const routes = Router();

routes.get("/all/:userId", favoritesController.getAllFavorites);
routes.get("/check/:userId/:catId", favoritesController.getFavorite);
routes.post("/add", favoritesController.addFavorite);
routes.delete("/remove/:userId/:catId", favoritesController.removeFavorite);

export default routes;
