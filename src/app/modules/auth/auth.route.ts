
import  express  from 'express';
import { AuthController } from './auth.controller';
import { UserController } from '../Users/user.controller';
import ValidateRequest from '../../middlewares/validateRequests';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../Users/user.validation';

const router = express.Router();

router.post('/refresh-token', ValidateRequest(AuthValidation.refreshTokenValidation), AuthController.refreshToken);

router.post('/register', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);

router.post('/login', AuthController.loginUser);

export const AuthValidationRoute = router;