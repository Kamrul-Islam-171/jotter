import { Types } from "mongoose";


export interface INote {
  name: string;
  userId: Types.ObjectId;
  favourite?: boolean;
}
