
import  express  from 'express';

import { UserController } from './user.controller';
import Auth from '../../middlewares/auth';
import ValidateRequest from '../../middlewares/validateRequests';
import { UserValidation } from './user.validation';
// import ValidateRequest from '../../middlewares/validateRequests';
// import { UserValidation } from './user.validation';
const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);

router.get('/check-user-storage', UserController.checkUserStorage);
router.get('/all-customers', UserController.getAllCustomers)
router.get('/me', Auth(), UserController.getMe);
// router.get('/:email', UserController.getSingleCustomer);

router.post('/change-password', Auth(), ValidateRequest(UserValidation.changePasswordValidationSchema), UserController.changePassword)
router.post('/forget-password', ValidateRequest(UserValidation.forgetPassValidation), UserController.forgetPassword)
router.post('/reset-password', ValidateRequest(UserValidation.resetPassValidation), UserController.resetPassword)

export const UserRoutes = router;