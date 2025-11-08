import { Router } from "express";
import catsControllers from "./cats.controllers";

const routes = Router();

routes.get("/all", catsControllers.getAllCats);
routes.get("/get-one/:catId", catsControllers.getOneCat);
routes.post("/", catsControllers.createCatCard);
routes.delete("/delete/:catId", catsControllers.deleteCatCard);
routes.put("/update/:catId", catsControllers.updateCat);

export default routes;
