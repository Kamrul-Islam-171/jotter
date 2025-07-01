import mongoose from "mongoose";
import { TerrorSourse, TGenericErrorResponse } from "../interface/error";

const HandleMongooseError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
    const statusCode  = 400;

    // console.log({errororro: Object.values(err.errors)});

    const errorSources : TerrorSourse[] = Object.values(err?.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })

     
    return {
        
        statusCode,
        message: 'Validation Error!!',
        errorSources
    }
}
export default HandleMongooseError