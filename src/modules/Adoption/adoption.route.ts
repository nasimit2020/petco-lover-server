import { Router } from "express";
import auth from "../../middlewares/auth";
import { adoptionController } from "./adoption.controller";


const router = Router();

router.post(
    '/api/adoption-request',
    auth(),
    adoptionController.submitAdoption
);

router.get(
    '/api/adoption-request',
    auth(),
    adoptionController.getAllAdoptionRequest
);

router.put(
    '/api/adoption-requests/:requestId',
    auth(),
    adoptionController.updateAdaptionStatus
);


export const adoptionRouter = {
    router
};