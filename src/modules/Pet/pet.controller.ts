import catchAsync from "../../middlewares/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { petFilterableFields } from "./pet.constant";
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
    const filters = pick(req.query, petFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await petService.getAllPetFromDB(filters, options);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Pets retrieved successfully',
        meta: result.meta,
        data: result.data
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