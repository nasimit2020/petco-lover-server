import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";

const userRegistration = catchAsync(async (req, res) => {
    const result = await userService.userRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User Create Successfully',
        data: result
    })
});

const getUser = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await userService.getUserFromDB(token as string);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User Create Successfully',
        data: result
    })
});



export const userController = {
    userRegistration,
    getUser,
}