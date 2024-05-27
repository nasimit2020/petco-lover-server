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

const getSingleUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    console.log(userId);

    const result = await userService.getUserFromDB(userId as string);

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

const getAllUsers = catchAsync(async (req, res) => {
    const result = await userService.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'All User Get Successfully',
        data: result
    })
});

const updateUserInfo = catchAsync(async (req, res) => {
    const { userId } = req.params;

    const result = await userService.updateUserIntoDB(userId as string, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User profile updated successfully',
        data: result
    })
});



export const userController = {
    userRegistration,
    getSingleUser,
    getUser,
    updateUserInfo,
    getAllUsers
}