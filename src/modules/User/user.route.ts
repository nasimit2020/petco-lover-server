import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { validationRequest } from "../../middlewares/validationRequest";
import { UserValidations } from "./user.validation";


const router = Router();

router.post(
    '/api/register',
    validationRequest(UserValidations.UserRegistrationValidation),
    userController.userRegistration
);

router.get('/api/profile', auth(), userController.getUser);

router.put('/api/profile', auth(), userController.updateUserInfo);

export const userRouter = {
    router
};