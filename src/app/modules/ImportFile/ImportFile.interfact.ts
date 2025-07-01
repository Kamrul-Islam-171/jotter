import { Types } from "mongoose";


export interface IImportFile {
  name: string;
  fileUrl:string;
  userId: Types.ObjectId;
  favourite?: boolean;
  type:"pdf"|"image"
}
