import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(error);


    res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        errorDetails: error
    })
};


export default globalErrorHandler;