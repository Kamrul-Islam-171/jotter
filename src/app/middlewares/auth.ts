/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../config";
import AppError from "../errors/AppError";

import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/Users/user.model";
import httpStatus from "http-status";
import { TUserRole } from "../modules/Users/user.interface";
const Auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
      const token = req.headers.authorization;
      // console.log("token = ",token)
      // if (token && token.startsWith('Bearer ')) {
      //   token = token.split(' ')[1]; // Extract the actual token after "Bearer"
      // }
      
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!");
      }
  
      //check if the token is correct
      const decoded = jwt.verify(
        token,
        config.access_secret as string
      ) as JwtPayload;
  
      // console.log(decoded)
  
      const {role, email, iat} = decoded;
  
      const user = await User.isUserExistsByEmail(email);
  
      
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not found!");
      }
   
    
    
      const userStatus = user?.isBlocked;
      if(userStatus) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!");
      }
  
  
  
      if (requiredRole && !requiredRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!");
      }
  
      //then ei id r role amra req e add kore dibo. jate pore req theke ei data nite pari
      // er jonno interface folder e index.d.ts file lagbe
      req.user = decoded as JwtPayload;
  
  
      next();
    });
  };
  
  export default Auth;