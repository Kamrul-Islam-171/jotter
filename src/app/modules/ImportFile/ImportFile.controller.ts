import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import  httpStatus  from 'http-status';
import { FileService } from "./ImportFile.service";




const createImage = catchAsync(async(req, res) => {

    // console.log(req.file);
    const file = req.file;
    
    // req.body = JSON.parse(req.body.data);
    
    // const fileName = (req.file?.originalname)
    
    
    const result = await FileService.createFileIntoDb(req.body, file );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Image Uploaded Successfully',
        data: result
        
    })
})
const createPdf = catchAsync(async(req, res) => {

    console.log(req.file);
    const file = req.file;
    
    // req.body = JSON.parse(req.body.data);
    
    // const fileName = (req.file?.originalname)
    
    
    // const result = await FileService.createImageIntoDb(req.body, file );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Pdf Uploaded Successfully',
        data: null
        
    })
})

export const ImportFileController = {
    createImage,
    createPdf
}