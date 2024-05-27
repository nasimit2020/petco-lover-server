import prisma from "../../shared/prisma"
import bcrypt from 'bcrypt';
import config from "../../config";
import { verifyToken } from "../../shared/jwtTokenGenerator";
import { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";

const userRegistrationIntoDB = async (payload: User) => {
    let hashedPassword: string = await bcrypt.hashSync(payload.password, 13);

    payload.password = hashedPassword;

    const result = await prisma.user.create({
        data: payload
    })

    const { password, ...userData } = result;

    return userData;
};

const getSingleUserFromDB = async (userId: string) => {


    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    const { password, ...userData } = result;

    return userData;
};
const getUserFromDB = async (token: string) => {
    const verifiedUser = verifyToken(token, config.jwt_secret as Secret);

    const result = await prisma.user.findUniqueOrThrow({
        where: {
            email: verifiedUser.email
        }
    })

    const { password, ...userData } = result;

    return userData;
};

const getAllUsersFromDB = async () => {
    const result = await prisma.user.findMany()
    return result;
};


const updateUserIntoDB = async (userId: string, payload: Partial<User>) => {

    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });

    const result = await prisma.user.update({
        where: {
            email: isUserExists.email
        },
        data: {
            ...payload
        }
    })

    const { password, ...userData } = result;

    return userData;
}



export const userService = {
    userRegistrationIntoDB,
    getSingleUserFromDB,
    getUserFromDB,
    updateUserIntoDB,
    getAllUsersFromDB
}