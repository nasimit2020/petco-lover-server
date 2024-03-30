import { Pet, Prisma } from "@prisma/client"
import prisma from "../../shared/prisma";

const addPetIntoDB = async (payload: Pet) => {
    const result = await prisma.pet.create({
        data: payload
    })
    return result;
};

const getAllPetFromDB = async (params: any) => {
    const { searchTerm, ...filteringData } = params;

    const andConditions: Prisma.PetWhereInput[] = [];

    const petSearchableFields = ['species', 'breed', 'location'];

    if (params.searchTerm) {
        andConditions.push(
            {
                OR: petSearchableFields.map(field => ({
                    [field]: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                }))
            }
        )
    };

    if (Object.keys(filteringData).length > 0) {
        andConditions.push(
            {
                AND: Object.keys(filteringData).map(key => ({
                    [key]: {
                        equals: filteringData[key],
                        mode: 'insensitive'
                    }
                }))
            }
        )
    }

    const whereCondition: Prisma.PetWhereInput = { AND: andConditions };

    const result = await prisma.pet.findMany({
        where: whereCondition
    })
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