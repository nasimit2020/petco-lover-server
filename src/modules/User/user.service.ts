import { User } from "@prisma/client"
import prisma from "../../shared/prisma"
import bcrypt from 'bcrypt';
import config from "../../config";
import { verifyToken } from "../../shared/jwtTokenGenerator";
import { Secret } from "jsonwebtoken";

const userRegistrationIntoDB = async (payload: User) => {
    let hashedPassword: string = await bcrypt.hashSync(payload.password, config.bcrypt_salt as string);

    payload.password = hashedPassword;

    const result = await prisma.user.create({
        data: payload
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
}



export const userService = {
    userRegistrationIntoDB,
    getUserFromDB
}