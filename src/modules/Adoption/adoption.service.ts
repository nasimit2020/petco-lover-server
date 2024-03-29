import { Adoption, AdoptionStatus, Prisma } from "@prisma/client"
import prisma from "../../shared/prisma";
import { verifyToken } from "../../shared/jwtTokenGenerator";
import config from "../../config";
import { Secret } from "jsonwebtoken";


const submitAdoptionIntoDB = async (payload: Adoption, token: string) => {
    const verifiedUser = verifyToken(token, config.jwt_secret as Secret);

    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: verifiedUser.email
        }
    });

    await prisma.pet.findUniqueOrThrow({
        where: {
            id: payload.petId
        }
    });

    const result = await prisma.adoption.create({
        data: {
            ...payload,
            userId: isUserExists.id
        }
    });
    return result;

};

const getAllAdoptionRequestFromDB = async () => {
    const result = await prisma.adoption.findMany({})
    return result;
};

const updateAdaptionStatusIntoDB = async (id: string, payload: Partial<Adoption>) => {

    const result = await prisma.adoption.update({
        where: {
            id: id
        },
        data: {
            status: payload.status
        }
    });

    return result;
};

export const adoptionService = {
    submitAdoptionIntoDB,
    getAllAdoptionRequestFromDB,
    updateAdaptionStatusIntoDB
}