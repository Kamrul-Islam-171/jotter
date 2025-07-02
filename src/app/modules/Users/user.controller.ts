import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createUser = catchAsync(async(req, res) => {

    const {confirm_password, ...userInfo} = req.body;

    const result = await UserService.createUserIngoDB(userInfo, confirm_password)
    const {_id, email, name} = result;
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: {
            _id,
            name,
            email
        }
    })
})

const unblockBlockUser = catchAsync(async(req, res) => {
    const {userId} = req.params;
    const query = req.query;
    await UserService.blockUnblockUser(userId, query);
    // console.log(query)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User ${query?.isBlock === 'true' ? 'blocked' : 'unblocked'} successfully`,
        data: {
           
        }
    })
})
const getAllCustomers = catchAsync(async(req, res) => {
    const query = req.query;
    
    const result = await UserService.getAllUsersFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrives successfully',
        data: result
    })
})
const getSingleCustomer = catchAsync(async(req, res) => {
    const {email} = req.params;
    
    const result = await UserService.getSingleUsersFromDB(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrives successfully',
        data: result
    })
})

const changePassword = catchAsync(async(req, res) => {
    
    // console.log(req.user, req.body);
    
    const {...passwordData} = req.body;
     await UserService.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully',
        data: {}
        // data: null
    })
})
const forgetPassword = catchAsync(async(req, res) => {
    
    // console.log(req.user, req.body);
    
    const {email} = req.body;
    await UserService.forgetPass(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Please Check your Email',
        data: {}
        // data: null
    })
})
const resetPassword = catchAsync(async(req, res) => {
    
    const token = req.headers.authorization;
    await UserService.resetPassword(req.body, token as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password Reset Successfully',
        data: {}
        // data: null
    })
})

const checkUserStorage = catchAsync(async(req, res) => {
    
    
    await UserService.getUserStorage();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Storage retrive Successfully',
        data: {}
        // data: null
    })
})
const getMe = catchAsync(async(req, res) => {
    
    
    
    const user = await UserService.getMe(req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My data retrivied Successfully',
        data: user
        // data: null
    })
})






export const UserController = {
    createUser,
    getMe,
    unblockBlockUser,
    getAllCustomers,
    getSingleCustomer,
    changePassword,
    forgetPassword,
    resetPassword,
    checkUserStorage
    
}