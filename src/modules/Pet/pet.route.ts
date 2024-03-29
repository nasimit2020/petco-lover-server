import { Router } from "express";
import { petController } from "./pet.controller";
import auth from "../../middlewares/auth";


const router = Router();

router.post('/api/pets', auth(), petController.addPet);

export const petRouter = {
    router
};