import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FolderService } from "./folder.service";
import  httpStatus  from 'http-status';



const createFolder = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.createFolderIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder created Successfully',
        data: result
        
    })
})
const getAllFolder = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.getAllFolders(req.body, req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folders retrived Successfully',
        data: result
        
    })
})
const makeFavourite = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.makeFavourite(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'This item is now your favourite',
        data: result
        
    })
})
const makeUnFavourite = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.makeUnFavourite(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'This item is removed from your favourite',
        data: result
        
    })
})
const upDateData = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.upDateData(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder name updated',
        data: result
        
    })
})
const deleteData = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.deleteData(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder is deleted',
        data: result
        
    })
})
const copyOrDuplicate = catchAsync(async(req, res) => {
    
    
    const result = await FolderService.copyOrDuplicate(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder is copied or duplicated',
        data: result
        
    })
})

export const FolderController = {
    createFolder,
    getAllFolder,
    makeFavourite,
    makeUnFavourite,
    upDateData,
    deleteData,
    copyOrDuplicate
   
}