import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtTokenGenerator } from "../../shared/jwtTokenGenarator";
import prisma from "../../shared/prisma";
import bcrypt from 'bcrypt';


const userLoginIntoDB = async (payload: { email: string, password: string }) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, isUserExists.password);

    if (!isCorrectPassword) {
        throw new Error("Your password is wrong")
    }

    const jwtSign = {
        email: payload.email,
        name: isUserExists.name
    };

    const token = jwtTokenGenerator(jwtSign, config.jwt_secret as Secret, config.jwt_expires_in as string)

    return {
        isUserExists,
        token
    };

};

export const authService = {
    userLoginIntoDB
}

