import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

router.post('/api/register', userController.userRegistration);

export const userRouter = {
    router
};