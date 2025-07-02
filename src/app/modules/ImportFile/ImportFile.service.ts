import AppError from '../../errors/AppError';
import { sendFiletoCloudinary } from '../../utils/uploadImageToCloudinary';
import { User } from '../Users/user.model';
import httpStatus from 'http-status';
import { ImportFile } from './ImportFile.model';
import { Folder } from '../Folder/folder.model';
import { Note } from '../Note/note.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createFileIntoDb = async (payload: { userEmail: string }, file: any) => {
  const { userEmail } = payload;
  const fileName = file?.originalname;
  // console.log("mmmm  = ", file)
  const extension = file?.mimetype.split('/')[1];

  // now first check userEmail
  const user = await User.findOne({ email: userEmail });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  const data = await sendFiletoCloudinary(fileName, file?.path);
  console.log('my data = ', data);
  const imageFileData = {
    name: fileName,
    userId: user?.id,
    fileUrl: data?.secure_url,
    type: extension == 'pdf' ? 'pdf' : 'image',
  };
  const res = await ImportFile.create(imageFileData);
  return res;
};

const getAllImages = async (
  paylload: { email: string },
  query: Record<string, unknown>,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });
  // console.log(user)

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const Query = new QueryBuilder(
    ImportFile.find({ userId: user?.id, type: 'image' }),
    query,
  ).search(['name']);
  const res = await Query.modelQuery;
  return res;
};
const getAllPdf = async (
  paylload: { email: string },
  query: Record<string, unknown>,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });
  // console.log(user)

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  const Query = new QueryBuilder(
    ImportFile.find({ userId: user?.id, type: 'pdf' }),
    query,
  ).search(['name']);
  const res = await Query.modelQuery;
  return res;
};

const getAllRecentItems = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const [Folders, Notes, Images, Pdfs] = await Promise.all([
    Folder.find({ userId: user?.id }).limit(3).sort({ createdAt: -1 }),
    Note.find({ userId: user?.id }).limit(3).sort({ createdAt: -1 }),
    ImportFile.find({ userId: user?.id, type: 'image' })
      .limit(3)
      .sort({ createdAt: -1 }),
    ImportFile.find({ userId: user?.id, type: 'pdf' })
      .limit(3)
      .sort({ createdAt: -1 }),
  ]);
  const allRectentItems = [...Folders, ...Notes, ...Images, ...Pdfs];

  const sortedItems = allRectentItems.sort((a: any, b: any) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });

  return sortedItems;
  // console.log(Folders, Notes, Pdfs)
};

const makeFavourite = async (paylload: { email: string }, id: string) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await ImportFile.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await ImportFile.findOneAndUpdate(
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
  const isExist = await ImportFile.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await ImportFile.findOneAndUpdate(
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

  const res = await ImportFile.deleteOne({ _id: id });
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
  const isExist = await ImportFile.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const res = await ImportFile.findOneAndUpdate(
    { _id: id },
    { name: paylload.newName },
    { new: true },
  );
  return res;
};
const cpoyOrDuplicate = async (
  paylload: { email: string; newName: string },
  id: string,
) => {
  const { email } = paylload;
  const user = await User.findOne({ email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const isExist = await ImportFile.findById({ _id: id });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item is not found');
  }
  const copyDAta = {
    name: isExist.name,
    fileUrl: isExist.fileUrl,
    userId: isExist.userId,
    favourite: isExist.favourite,
    type: isExist.type,
  };
  const res = await ImportFile.create(copyDAta);
  return res;
};

export const FileService = {
  createFileIntoDb,
  getAllImages,
  getAllPdf,
  getAllRecentItems,
  makeFavourite,
  makeUnFavourite,
  updateData,
  deleteData,
  cpoyOrDuplicate,
};
