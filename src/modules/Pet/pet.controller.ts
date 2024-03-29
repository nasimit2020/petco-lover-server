import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { petService } from "./pet.service";

const addPet = catchAsync(async (req, res) => {
    const result = await petService.addPetIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Pet added successfully',
        data: result
    })
});



export const petController = {
    addPet
}