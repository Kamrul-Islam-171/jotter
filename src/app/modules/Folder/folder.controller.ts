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

export const FolderController = {
    createFolder
}