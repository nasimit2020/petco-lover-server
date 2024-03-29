import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";


const router = Router();

router.post('/api/register', userController.userRegistration);

router.get('/api/profile', auth(), userController.getUser);

export const userRouter = {
    router
};