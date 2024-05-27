import { Router } from "express";
import { petController } from "./pet.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "@prisma/client";


const router = Router();

router.post('/api/pets', auth(USER_ROLE.ADMIN), petController.addPet);

router.get('/api/pets', petController.getAllPet);

router.get('/api/pet/:petId', petController.getSinglePet);

router.put('/api/pets/:petId', auth(), petController.updatePetProfile);

export const petRouter = {
    router
};