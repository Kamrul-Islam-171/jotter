import AppError from '../../errors/AppError';
import { Folder } from '../Folder/folder.model';
import { ImportFile } from '../ImportFile/ImportFile.model';
import { Note } from '../Note/note.model';
import { User } from '../Users/user.model';

const getAllItemsByCalender = async (
  payload: { email: string },
  date: string,
) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  const targetDate = new Date(date);
  // console.log(targetDate)
  const startDate = new Date(targetDate.setHours(0, 0, 0, 0));
  const endDate = new Date(targetDate.setHours(23, 59, 59, 999));
  // console.log(startDate, endDate);

  const [Folders, Notes, Images, Pdfs] = await Promise.all([
    Folder.find({ userId: user?.id }).sort({ createdAt: -1 }),
    Note.find({ userId: user?.id }).sort({ createdAt: -1 }),
    ImportFile.find({ userId: user?.id, type: 'image' }).sort({
      createdAt: -1,
    }),
    ImportFile.find({ userId: user?.id, type: 'pdf' }).sort({ createdAt: -1 }),
  ]);
  const allItems = [...Folders, ...Notes, ...Images, ...Pdfs];

  return allItems;
};

const getAllFavouriteItems = async (
  payload: { email: string },
  search: string,
) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }
  const query = search ? search : '';

  const [Folders, Notes, Images, Pdfs] = await Promise.all([
    Folder.find({
      userId: user?.id,
      name: { $regex: query, $options: 'i' },
      favourite: true,
    }).sort({ createdAt: -1 }),
    Note.find({
      userId: user?.id,
      name: { $regex: query, $options: 'i' },
      favourite: true,
    }).sort({ createdAt: -1 }),
    ImportFile.find({
      userId: user?.id,
      type: 'image',
      name: { $regex: query, $options: 'i' },
      favourite: true,
    }).sort({ createdAt: -1 }),
    ImportFile.find({
      userId: user?.id,
      type: 'pdf',
      name: { $regex: query, $options: 'i' },
      favourite: true,
    }).sort({ createdAt: -1 }),
  ]);
  const allItems = [...Folders, ...Notes, ...Images, ...Pdfs];

  return allItems;
};

const makeAnItemUnFavourite = async (
  payload: { email: string },
  id: string,
) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not authorized');
  }

  const [Folders, Notes, Images, Pdfs] = await Promise.all([
    Folder.find({
      userId: user?.id,
      _id: id,
      favourite: true,
    }).sort({ createdAt: -1 }),
    Note.find({
      userId: user?.id,
      _id: id,
      favourite: true,
    }).sort({ createdAt: -1 }),
    ImportFile.find({
      userId: user?.id,
      type: 'image',
      _id: id,
      favourite: true,
    }).sort({ createdAt: -1 }),
    ImportFile.find({
      userId: user?.id,
      type: 'pdf',
      _id: id,
      favourite: true,
    }).sort({ createdAt: -1 }),
  ]);
  const allItems = [...Folders, ...Notes, ...Images, ...Pdfs];

  const [Folders1, Notes1, Images1, Pdfs1] = await Promise.all([
    Folder.findOneAndUpdate(
      {
        userId: user?.id,
        _id: id,
      },
      { favourite: false },
    ).sort({ createdAt: -1 }),
    Note.findOneAndUpdate(
      {
        userId: user?.id,
        _id: id,
      },
      { favourite: false },
    ).sort({ createdAt: -1 }),
    ImportFile.findOneAndUpdate(
      {
        userId: user?.id,
        type: 'image',
        _id: id,
      },
      { favourite: false },
    ).sort({ createdAt: -1 }),
    ImportFile.findOneAndUpdate(
      {
        userId: user?.id,
        type: 'pdf',
        _id: id,
      },
      { favourite: false },
    ).sort({ createdAt: -1 }),
  ]);
  const allItems2 = [Folders1, Notes1, Images1, Pdfs1];

  return allItems2;
};

export const CommonService = {
  getAllItemsByCalender,
  getAllFavouriteItems,
  makeAnItemUnFavourite,
};
