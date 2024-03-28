import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

router.post('/api/login', authController.userLogin);

export const authRoute ={
    router
}