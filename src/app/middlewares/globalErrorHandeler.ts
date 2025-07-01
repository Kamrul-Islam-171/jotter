/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TerrorSourse } from "../interface/error";
import HandleZodError from "../errors/HandleZodError";
import config from "../config";
import AppError from "../errors/AppError";
import HandleMongooseError from "../errors/HandleMongooseError";
import HandleCastError from "../errors/HandleCastError";
import HandleDuplicateError from "../errors/HandleDuplicateError";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something Went wrong";

    //default values
    let errorSources : TerrorSourse[] = [{
        path: '',
        message: 'Something went wrong'
    }]

    if(err?.name === 'ZodError') {
        const simplifiedError = HandleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if(err?.name === 'ValidationError') {
       
    
        const simplifiedError = HandleMongooseError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
      }
      else if(err?.name === "CastError") {
       
        const simplifiedError = HandleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
      }
      else if(err?.code === 11000) {
        const simplifiedError = HandleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
      }
      else if(err instanceof AppError) {
        // console.log(err.name)
        
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [{
          path: '',
          message: err?.message
        }];
      }
      else if(err instanceof Error) {
        // ei error k sobar last e hangle korte hobe. na hole sob err er to Error er moddhe pore tai agei ei if block e dhukbe
      
        message = err?.message;
        // console.log(err.name)
        errorSources = [{
          path: '',
          message: err?.message
        }];
      }

    res.status(statusCode).json({
        success: false,
        message,
        // error: err,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err.stack: null,
    })
}

export default globalErrorHandler;



/*
error pattern

success
message
errorSources : [
   'path': '',
   'message' : ''
]
stack   


*/