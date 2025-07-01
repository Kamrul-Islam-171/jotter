import AppError from "../../errors/AppError";
import { User } from "../Users/user.model";
import  httpStatus  from 'http-status';
import { Folder } from "./folder.model";


const createFolderIntoDb = async(payload:{name:string, userEmail:string, parentId?:string, favourite?:boolean}) => {
    const {userEmail} = payload;

    // now first check userEmail
    const user = await User.findOne({email:userEmail});
    
    if(!user || user.isDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized")
    }
    const folderInfo = {name:payload.name, userId: user?.id, parentId: payload?.parentId, favourite: payload?.favourite};
    // console.log(folderInfo)
    const res = await Folder.create(folderInfo);
    return res;
}

export const FolderService = {
    createFolderIntoDb
}