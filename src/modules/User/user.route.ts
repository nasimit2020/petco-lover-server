import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { validationRequest } from "../../middlewares/validationRequest";
import { UserValidations } from "./user.validation";
import { USER_ROLE } from "@prisma/client";


const router = Router();

router.post(
    '/api/register',
    validationRequest(UserValidations.UserRegistrationValidation),
    userController.userRegistration
);


router.get('/api/users', auth(USER_ROLE.ADMIN), userController.getAllUsers);

router.get('/api/profile/:userId', auth(USER_ROLE.ADMIN, USER_ROLE.USER), userController.getSingleUser);

router.get('/api/profile', auth(USER_ROLE.ADMIN, USER_ROLE.USER), userController.getUser);

router.put('/api/profile/:userId', auth(USER_ROLE.ADMIN, USER_ROLE.USER), userController.updateUserInfo);

router.patch('/api/profile/:userId', auth(USER_ROLE.USER), userController.updateUserInfo);

export const userRouter = {
    router
};