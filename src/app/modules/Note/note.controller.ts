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

export const NoteController = {
    createNote
}