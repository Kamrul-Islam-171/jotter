import AppError from "../../errors/AppError";
import {  sendFiletoCloudinary } from "../../utils/uploadImageToCloudinary";
import { User } from "../Users/user.model";
import  httpStatus  from 'http-status';
import { ImportFile } from "./ImportFile.model";




const createFileIntoDb = async(payload:{ userEmail:string, type:string}, file:any) => {
    const {userEmail} = payload;
    const fileName = (file?.originalname)

    // now first check userEmail
    const user = await User.findOne({email:userEmail});
    
    if(!user || user.isDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized")
    }

    const data = await sendFiletoCloudinary(fileName, file?.path);
    // console.log("my data = ", data?.secure_url);
    const imageFileData = {
        name: fileName,
        userId:user?.id,
        fileUrl:data?.secure_url,
        type:payload?.type == 'image' ? 'image' : 'pdf'
    }
    const res = await ImportFile.create(imageFileData);
    return res;
   
}





export const FileService = {
    createFileIntoDb
}