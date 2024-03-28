import { User } from "@prisma/client"
import prisma from "../../shared/prisma"
import bcrypt from 'bcrypt';
import config from "../../config";

const userRegistrationIntoDB = async (payload: User) => {
    let hashedPassword: string = await bcrypt.hashSync(payload.password, config.bcrypt_salt as string);

    payload.password = hashedPassword;

    const result = await prisma.user.create({
        data: payload
    })

    const { password, ...userData } = result;

    return userData;
}

export const userService = {
    userRegistrationIntoDB
}