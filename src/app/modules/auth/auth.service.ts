import AppError from '../../errors/AppError';
import { User } from '../Users/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';
import  jwt, { JwtPayload }  from 'jsonwebtoken';
const loginUser = async (paylod: TLoginUser) => {
  const { email } = paylod;

  const user = await User.isUserExistsByEmail(email);
  // console.log(user);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  const userStatus = user?.isDeleted;
  if (userStatus) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  const isPassMatched = await User.isPasswordMaatched(
    paylod?.password,
    user?.password,
  );
  if (!isPassMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  const jwtPayload = {
    email: user.email,
    
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expire as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expire as string
  );
  // console.log(accessToken)
  return { accessToken,refreshToken };
};


//refresh token
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.refresh_secret as string,
  ) as JwtPayload;

  // console.log(decoded);

  const { email } = decoded;

  // checking if the user is exist
  // const user = await User.isUserExists(id);
  const user = await User.findOne({email});

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const userStatus = user?.isDeleted;
  if (userStatus) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  // const isPassMatched = await User.isPasswordMaatched(
  //   paylod?.password,
  //   user?.password,
  // );
  // if (!isPassMatched) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  // }

  const jwtPayload = {
    email: user.email,
    
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expire as string,
  );

  return {
    accessToken,
  };


};

export const AuthServices = {
  loginUser,
  refreshToken
};
