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

const getAllPet = catchAsync(async (req, res) => {
    //console.log(req.query);

    const result = await petService.getAllPetFromDB(req.query);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Pets retrieved successfully',
        data: result
    })
});

const updatePetProfile = catchAsync(async (req, res) => {
    const { petId } = req.params;

    const result = await petService.updatePetProfileIntoDB(petId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Pet profile updated successfully',
        data: result
    })
});



export const petController = {
    addPet,
    getAllPet,
    updatePetProfile,
}