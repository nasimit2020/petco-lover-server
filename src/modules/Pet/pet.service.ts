import { Pet } from "@prisma/client"
import prisma from "../../shared/prisma";

const addPetIntoDB = async (payload: Pet) => {
    const result = await prisma.pet.create({
        data: payload
    })
    return result;

}

export const petService = {
    addPetIntoDB
}