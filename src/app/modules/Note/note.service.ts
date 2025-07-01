import AppError from "../../errors/AppError";
import { User } from "../Users/user.model";
import  httpStatus  from 'http-status';
import { Note } from "./note.model";



const createNoteIntoDb = async(payload:{name:string, userEmail:string, favourite?:boolean}) => {
    const {userEmail} = payload;

    // now first check userEmail
    const user = await User.findOne({email:userEmail});
    
    if(!user || user.isDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized")
    }
    const NoteInfo = {name:payload.name, userId: user?.id, favourite: payload?.favourite};
    // console.log(folderInfo)
    const res = await Note.create(NoteInfo);
    return res;
}

export const NoteService = {
    createNoteIntoDb
}