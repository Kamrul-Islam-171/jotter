import mongoose, { model, Schema } from 'mongoose';
import { INote } from './note.interfact';


const noteSchema = new Schema<INote>({
  name: {
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
}, {timestamps: true});

export const Note = model<INote>('Note', noteSchema);
