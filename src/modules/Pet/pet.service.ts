import { Pet, Prisma } from "@prisma/client"
import prisma from "../../shared/prisma";
import { petSearchableFields } from "./pet.constant";
import { calculatePagination } from "../../helpers/calculatePagination";

const addPetIntoDB = async (payload: Pet) => {

    const result = await prisma.pet.create({
        data: {
            ...payload,
            photo: payload.photo as string[],
        },
    })
    return result;
};

const getSinglePetFromDB = async (petId: string) => {

    const result = await prisma.pet.findUniqueOrThrow({
        where: {
            id: petId
        }
    })
    return result;
};

const getAllPetFromDB = async (params: any, options: any) => {
    const { searchTerm, ...filteringData } = params;
    const { page, limit, sortBy, sortOrder } = calculatePagination(options);

    const andConditions: Prisma.PetWhereInput[] = [];

    andConditions.push({ isDeleted: false });

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
        where: whereCondition,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.pet.count({
        where: whereCondition
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: {
            result
        }
    };
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
    getSinglePetFromDB
}