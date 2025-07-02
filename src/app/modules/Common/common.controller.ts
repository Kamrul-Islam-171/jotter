import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import  httpStatus  from 'http-status';
import { CommonService } from "./common.service";




const getAllItemsByCalender = catchAsync(async(req, res) => {
    
    const {date} = req.query;
    
    const result = await CommonService.getAllItemsByCalender(req.body, date as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Data retrived Successfully',
        data: result
        
    })
})
const getAllFavouriteItems = catchAsync(async(req, res) => {
    
    const {search} = req.query;
    
    const result = await CommonService.getAllFavouriteItems(req.body, search as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Data retrived Successfully',
        data: result
        
    })
})
const makeAnItemUnFavourite = catchAsync(async(req, res) => {
    
    const {id} = req.params;
    
    const result = await CommonService.makeAnItemUnFavourite(req.body, id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Data updated Successfully',
        data: result
        
    })
})


export const CommonController = {
   
    getAllItemsByCalender,
    getAllFavouriteItems,
    makeAnItemUnFavourite
   
   
}