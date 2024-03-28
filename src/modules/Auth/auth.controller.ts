import catchAsync from "../../middlewares/catchAsync";


const userLogin = catchAsync(async (req, res) => {
    console.log(req.body);

});

export const authController = {
    userLogin
}