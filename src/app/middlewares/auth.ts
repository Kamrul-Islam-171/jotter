/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../config";
import AppError from "../errors/AppError";

import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/Users/user.model";
import httpStatus from "http-status";

const Auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
      const token = req.headers.authorization;
      
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!");
      }
  
      //check if the token is correct
      const decoded = jwt.verify(
        token,
        config.access_secret as string
      ) as JwtPayload;
  
      // console.log(decoded)
  
      const { email, iat} = decoded;
  
      const user = await User.isUserExistsByEmail(email);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not found!");
      }
   
    
    
      const userStatus = user?.isDeleted;
      if(userStatus) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized!");
      }
  
      //then ei id r role amra req e add kore dibo. jate pore req theke ei data nite pari
      // er jonno interface folder e index.d.ts file lagbe
      req.user = decoded as JwtPayload;
      next();
    });
  };
  
  export default Auth;