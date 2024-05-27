
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { Secret } from "jsonwebtoken";
import { verifyToken } from "../shared/jwtTokenGenerator";

const auth = (...requiredRole: string[]) => {

    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {

        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error("Unauthorized user")
            };

            const verifiedUser = verifyToken(token, config.jwt_secret as Secret);

            req.user = verifiedUser;

            if (requiredRole && !requiredRole.includes(verifiedUser.role)) {
                throw new Error("Forbidden");
            }

            next();

        } catch (error) {
            next(error)
        }
    }
};

export default auth;