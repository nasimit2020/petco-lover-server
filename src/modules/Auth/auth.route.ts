import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

router.post('/api/login', authController.userLogin);

router.patch('/api/change-password', authController.changePassword);

export const authRoute = {
    router
}