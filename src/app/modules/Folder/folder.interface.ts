import { Types } from 'mongoose';

export interface ICreateFolder {
  name: string;
  parentId?: Types.ObjectId | null;
  userId: Types.ObjectId;
  favourite?: boolean;
}
