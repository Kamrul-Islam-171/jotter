import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import { createToken } from '../auth/auth.utils';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';
import  jwt  from 'jsonwebtoken';
const createUserIngoDB = async (payload: TUser, confirm_password:string) => {
  
  if(payload.password !== confirm_password) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password does not match');
  }
  // console.log(userInfo)
  const res = await User.create(payload)
  return res;
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(User.find(), query).filter().paginate().fieldsLimiting();
  const result = await customerQuery.modelQuery;
  const meta = await customerQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getSingleUsersFromDB = async (email:string) => {
  const result = await User.findOne({email});
  return result;
};



const blockUnblockUser = async (id: string, query: Record<string, unknown>) => {
  const user = await User.findOne(new mongoose.Types.ObjectId(id));
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !!');
  }
  // if (user?.isBlocked) {
  //   throw new AppError(httpStatus.OK, 'User is already blocked !!');
  // }

  const res = await User.findByIdAndUpdate(id, {
    $set: {
      isBlocked: query?.isBlock,
    },
  });
  return res;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { old_password: string; new_password: string, confirm_password:string }
) => {
  // console.log(userData)
  
  const {email} = userData;
  const user = await User.findOne({email}).select("email password isDeleted"); 

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!");
  }

  if(payload.new_password !== payload.confirm_password) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'confirm pass does not match')
  }

  const isPasswordMatched = await User.isPasswordMaatched(
    payload?.old_password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }


  const newHashedPass = await bcrypt.hash(payload?.new_password, 12);

  await User.findOneAndUpdate(
    { email: userData.email},
    {
      password: newHashedPass,
      // passwordChangeAt: new Date(),
    }
  );

  return null; 
};

const forgetPass = async(email:string) => {
  // console.log(email);
  const user = await User.findOne({email});
  if(!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  //create a token
   const jwtPayload = {
      email: user.email,
      
    };
  
    const Token = createToken(
      jwtPayload,
      config.access_secret as string,
      '10d' // for text
      // '10m' // expires time very short.
    );
  const resetPassUrl = `${config.reset_ui_url}/reset-password?email=${user.email}&token=${Token}`;
  const htmlUi = `
  <h3>Please Click the below link to reset your password : </h3>
  <p>${resetPassUrl}</p>`
  sendEmail(user.email, htmlUi);
}

const resetPassword = async(payload : {email:string, new_password:string, confirm_password:string}, token:string) =>{
  const {email} = payload;
  const user = await User.findOne({email});
  if(!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  
  // now verify token
  const decoded = jwt.verify(
    token,
    config.access_secret as string
  ) as JwtPayload

  if(email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden")
  }

  // now check pass and confirm pass
  if(payload.new_password !== payload.confirm_password){
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Password and Confirm password do not match")
  }

  // hash password
  const newHashedPassword = await bcrypt.hash(payload.new_password, 12);
  
  await User.findOneAndUpdate({email}, {
    password: newHashedPassword
  })
}

const getUserStorage = async() => {
  
  const db = mongoose.connection.db;
  const stats = await db?.command({collStats: 'users'}); // data base e users name e collection ta save ache
  const storate = stats?.storageSize;
  const sotrageKb = storate / (1024); // byte to kb;
  // const sotrageMb = storate / (1024 * 1024); // byte to mb;

  console.log(sotrageKb.toFixed(2))
}

const getMe = async(UserData:JwtPayload) => {
  // console.log(UserData);
  const {email} = UserData;
  const res = await User.findOne({email});
  return res;
}

export const UserService = {
  createUserIngoDB,
  blockUnblockUser,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  changePassword,
  forgetPass,
  resetPassword,
  getUserStorage,
  getMe
};

