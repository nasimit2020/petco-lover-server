import { Router } from "express";
import auth from "../../middlewares/auth";
import { adoptionController } from "./adoption.controller";
import { USER_ROLE } from "@prisma/client";


const router = Router();

router.post(
    '/api/adoption-request',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    adoptionController.submitAdoption
);

router.get(
    '/api/adoption-request',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    adoptionController.getAllAdoptionRequest
);

router.get(
    '/api/my-adoption',
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    adoptionController.getMyAdoption
);

router.put(
    '/api/adoption-requests/:requestId',
    auth(USER_ROLE.ADMIN),
    adoptionController.updateAdaptionStatus
);


export const adoptionRouter = {
    router
};