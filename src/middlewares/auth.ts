
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { Secret } from "jsonwebtoken";
import { verifyToken } from "../shared/jwtTokenGenerator";

const auth = () => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {

        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error("Unauthorized")
            };

            const verifiedUser = verifyToken(token, config.jwt_secret as Secret);

            req.user = verifiedUser;

            next();

        } catch (error) {
            next(error)
        }
    }
};

export default auth;