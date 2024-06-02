import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtTokenGenerator, verifyToken } from "../../shared/jwtTokenGenerator";
import prisma from "../../shared/prisma";
import bcrypt from 'bcrypt';


const userLoginIntoDB = async (payload: { email: string, password: string }) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    });

    // console.log(isUserExists);


    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, isUserExists.password);

    if (!isCorrectPassword) {
        throw new Error("Your password is wrong")
    }

    const jwtSign = {
        email: payload.email,
        name: isUserExists.name,
        role: isUserExists.role,
    };

    const token = jwtTokenGenerator(jwtSign, config.jwt_secret as Secret, config.jwt_expires_in as string)

    return {
        isUserExists,
        token
    };

};


const passwordChangeIntoDB = async (token: string, payload: { oldPassword: string, newPassword: string }) => {
    // console.log({ token, payload });

    const verifiedUser = verifyToken(token, config.jwt_secret as Secret);

    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: verifiedUser.email
        }
    });

    console.log({ isUserExists });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, isUserExists.password);

    if (!isCorrectPassword) {
        throw new Error("Your Old password is wrong")
    }

    let hashedPassword: string = await bcrypt.hashSync(payload.newPassword, 13);

    const result = await prisma.user.update({
        where: {
            email: verifiedUser.email
        },
        data: {
            password: hashedPassword
        }
    });


    return result;

};

export const authService = {
    userLoginIntoDB,
    passwordChangeIntoDB
}

