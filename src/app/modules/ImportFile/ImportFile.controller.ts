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
const getAllImage = catchAsync(async(req, res) => {

    
    
    const result = await FileService.getAllImages(req.body, req.query );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Images Retrived Successfully',
        data: result
        
    })
})
const getAllPdf = catchAsync(async(req, res) => {

    
    
    const result = await FileService.getAllPdf(req.body, req.query );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Pdfs Retrived Successfully',
        data: result
        
    })
})
const getAllRecentItems = catchAsync(async(req, res) => {

    
    
    const result = await FileService.getAllRecentItems(req.body.email );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rectent items Retrived Successfully',
        data: result
        
    })
})

const makeFavourite = catchAsync(async(req, res) => {
    
    
    const result = await FileService.makeFavourite(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'This item is now your favourite',
        data: result
        
    })
})
const makeUnFavourite = catchAsync(async(req, res) => {
    
    
    const result = await FileService.makeUnFavourite(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'This item is removed from favourite',
        data: result
        
    })
})
const updateData = catchAsync(async(req, res) => {
    
    
    const result = await FileService.updateData(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'File name updated',
        data: result
        
    })
})
const deleteData = catchAsync(async(req, res) => {
    
    
    const result = await FileService.deleteData(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'File deleted',
        data: result
        
    })
})
const cpoyOrDuplicate = catchAsync(async(req, res) => {
    
    
    const result = await FileService.cpoyOrDuplicate(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'File copied or duplicated',
        data: result
        
    })
})


export const ImportFileController = {
    createImage,
    getAllImage,
    getAllPdf,
    getAllRecentItems,
    makeFavourite,
    makeUnFavourite,
    updateData,
    deleteData,
    cpoyOrDuplicate
    
}