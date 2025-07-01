import mongoose, { model, Schema } from 'mongoose';
import { ICreateFolder } from './folder.interface';

const folderSchema = new Schema<ICreateFolder>({
  name: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

export const Folder = model<ICreateFolder>('Folder', folderSchema);
