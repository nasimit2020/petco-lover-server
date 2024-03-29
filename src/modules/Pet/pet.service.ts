import { Pet } from "@prisma/client"
import prisma from "../../shared/prisma";

const addPetIntoDB = async (payload: Pet) => {
    const result = await prisma.pet.create({
        data: payload
    })
    return result;
};

const getAllPetFromDB = async () => {
    const result = await prisma.pet.findMany({})
    return result;
};

const updatePetProfileIntoDB = async (id: string, payload: Partial<Pet>) => {
    const result = await prisma.pet.update({
        where: {
            id: id
        },
        data: {
            ...payload
        }
    });

    return result;
};

export const petService = {
    addPetIntoDB,
    getAllPetFromDB,
    updatePetProfileIntoDB,
}