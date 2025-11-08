import { Router } from "express";
import authControllers from "./auth.controllers";



const router = Router()

router.post("/register", authControllers.Register)
router.post("/login", authControllers.Login)

export default router

