import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { adoptionService } from "./adoption.service";

const submitAdoption = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await adoptionService.submitAdoptionIntoDB(req.body, token as string);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Adoption request submitted successfully",
        data: result
    })
});

const getAllAdoptionRequest = catchAsync(async (req, res) => {
    const result = await adoptionService.getAllAdoptionRequestFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Adoption requests retrieved successfully',
        data: result
    })
});

const getMyAdoption = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await adoptionService.getMyAdoptionFromDB(token as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Adoption requests retrieved successfully',
        data: result
    })
});

const updateAdaptionStatus = catchAsync(async (req, res) => {
    const { requestId } = req.params;

    const result = await adoptionService.updateAdaptionStatusIntoDB(requestId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Adoption request updated successfully',
        data: result
    })
});



export const adoptionController = {
    submitAdoption,
    getAllAdoptionRequest,
    updateAdaptionStatus,
    getMyAdoption
}