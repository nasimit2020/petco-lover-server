import { Router } from "express";
import { petController } from "./pet.controller";
import auth from "../../middlewares/auth";


const router = Router();

router.post('/api/pets', auth(), petController.addPet);

router.get('/api/pets', petController.getAllPet);

router.get('/api/pets/:petId', auth(), petController.updatePetProfile);

export const petRouter = {
    router
};