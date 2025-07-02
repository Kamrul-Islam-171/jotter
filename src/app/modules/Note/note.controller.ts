import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import  httpStatus  from 'http-status';
import { NoteService } from "./note.service";



const createNote = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.createNoteIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Note created Successfully',
        data: result
        
    })
})
const getAllNote = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.getAllNotes(req.body, req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Notes retrived Successfully',
        data: result
        
    })
})

const makeFavourite = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.makeFavourite(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'This item is now your favourite',
        data: result
        
    })
})
const makeUnFavourite = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.makeUnFavourite(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'This item is removed from favourite',
        data: result
        
    })
})
const updateData = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.updateData(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Note Updated',
        data: result
        
    })
})
const deleteData = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.deleteData(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Note Deleted',
        data: result
        
    })
})
const cpoyOrDuplicate = catchAsync(async(req, res) => {
    
    
    const result = await NoteService.cpoyOrDuplicate(req.body, req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Note Cpoied or duplicated',
        data: result
        
    })
})

export const NoteController = {
    createNote,
    getAllNote,
    makeFavourite,
    makeUnFavourite,
    updateData,
    deleteData,
    cpoyOrDuplicate
    
}