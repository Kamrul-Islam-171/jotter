import mongoose, { model, Schema } from 'mongoose';
import { IImportFile } from './ImportFile.interfact';



const fileSchema = new Schema<IImportFile>({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
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
  type: {
    type:String,
    enum: ['pdf', 'image'],
    required:true
  }
}, {timestamps: true});

export const ImportFile = model<IImportFile>('ImportFile', fileSchema);
