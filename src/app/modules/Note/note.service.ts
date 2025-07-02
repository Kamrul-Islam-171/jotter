import AppError from '../../errors/AppError';
import { User } from '../Users/user.model';
import httpStatus from 'http-status';
import { Note } from './note.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createNoteIntoDb = async (payload: {
  name: string;
  userEmail: string;
  favourite?: boolean;
}) => {
  const { userEmail } = payload;

  // now first check userEmail
  const user = await User.findOne({ email: userEmail });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const NoteInfo = {
    name: payload.name,
    userId: user?.id,
    favourite: payload?.favourite,
  };
  // console.log(folderInfo)
  const res = await Note.create(NoteInfo);
  return res;
};

const getAllNotes = async (
  paylload: { email: string },
  query: Record<string, unknown>,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });
  // console.log(user)

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  const Query = new QueryBuilder(Note.find({ userId: user?.id }), query).search(
    ['name'],
  );
  const res = await Query.modelQuery;
  return res;
};

const makeFavourite = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Note.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await Note.findOneAndUpdate(
    { _id: id },
    { favourite: true },
    { new: true },
  );
  return res;
};
const makeUnFavourite = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Note.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await Note.findOneAndUpdate(
    { _id: id },
    { favourite: false },
    { new: true },
  );
  return res;
};
const deleteData = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  const res = await Note.deleteOne({ _id: id });
  return res;
};
const updateData = async (
  paylload: { email: string; newName: string },
  id: string,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Note.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await Note.findOneAndUpdate(
    { _id: id },
    { name: paylload.newName },
    { new: true },
  );
  return res;
};
const cpoyOrDuplicate = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Note.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }

  const copyData = {
    name: isExist.name,
    userId: isExist.userId,
    favourite: isExist.favourite,
  };
  const res = await Note.create(copyData);
  return res;
};

export const NoteService = {
  createNoteIntoDb,
  getAllNotes,
  makeFavourite,
  makeUnFavourite,
  updateData,
  deleteData,
  cpoyOrDuplicate,
};
