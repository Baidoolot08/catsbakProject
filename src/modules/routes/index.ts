import { Router } from "express";
import cors from "cors";
import authRoutes from "../auth/auth.routes";
import catsRoutes from "../cats/cats.routes";
import favoriteRouter from "../favorites/favorites.routes";
import authMiddleware from "../../middleware/authroutes";

const globalRouter = Router();

const corsconfig = {
  origin: ["http://localhost:3000"],
};
globalRouter.use("/auth", cors(corsconfig), authRoutes);
globalRouter.use("/cats", cors(corsconfig), catsRoutes);
globalRouter.use("/favorites", cors(corsconfig), favoriteRouter);
globalRouter.use("/user", cors(corsconfig), authMiddleware);

export default globalRouter;
