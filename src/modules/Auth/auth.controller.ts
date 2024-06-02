import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authService } from "./auth.service";


const userLogin = catchAsync(async (req, res) => {
    const result = await authService.userLoginIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: {
            id: result.isUserExists.id,
            name: result.isUserExists.name,
            email: result.isUserExists.email,
            token: result.token
        }
    })

});

const changePassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await authService.passwordChangeIntoDB(token as string, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Password change successfully",
        data: result
    })

});

export const authController = {
    userLogin,
    changePassword
}