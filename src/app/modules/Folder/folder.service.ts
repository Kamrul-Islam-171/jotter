import AppError from '../../errors/AppError';
import { User } from '../Users/user.model';
import httpStatus from 'http-status';
import { Folder } from './folder.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createFolderIntoDb = async (payload: {
  name: string;
  userEmail: string;
  parentId?: string;
  favourite?: boolean;
}) => {
  const { userEmail } = payload;

  // now first check userEmail
  const user = await User.findOne({ email: userEmail });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const folderInfo = {
    name: payload.name,
    userId: user?.id,
    parentId: payload?.parentId,
    favourite: payload?.favourite,
  };
  // console.log(folderInfo)
  const res = await Folder.create(folderInfo);
  return res;
};

const getAllFolders = async (
  paylload: { email: string },
  query: Record<string, unknown>,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  console.log(user);
  // const allFolders = await Folder.find({userId: user?.id});
  // return allFolders;

  console.log(query);

  const folderQuery = new QueryBuilder(
    Folder.find({ userId: user?.id }),
    query,
  ).search(['name']);
  const res = await folderQuery.modelQuery;
  return res;
};
const makeFavourite = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Folder.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await Folder.findOneAndUpdate(
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
  const isExist = await Folder.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await Folder.findOneAndUpdate(
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

  const res = await Folder.deleteOne({ _id: id });
  return res;
};

const upDateData = async (
  paylload: { email: string; newName: string },
  id: string,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Folder.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await Folder.findOneAndUpdate(
    { _id: id },
    { name: paylload.newName },
    { new: true },
  );
  return res;
};

const copyOrDuplicate = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await Folder.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const copyData = {
    name: isExist.name,
    parentId: isExist.parentId,
    userId: isExist.userId,
    favourite: isExist.favourite,
  };
  const res = await Folder.create(copyData);
  return res;
};

export const FolderService = {
  createFolderIntoDb,
  getAllFolders,
  makeFavourite,
  makeUnFavourite,
  upDateData,
  deleteData,
  copyOrDuplicate,
};
