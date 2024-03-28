import { User } from "@prisma/client"
import prisma from "../../shared/prisma"
import bcrypt from 'bcrypt';

const userRegistrationIntoDB = async (payload: User) => {
    let hashedPassword: string = await bcrypt.hashSync(payload.password, 13);

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