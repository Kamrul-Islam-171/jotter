
import  express  from 'express';
import ValidateRequest from '../../middlewares/validateRequests';
import { ForlderValidation } from './folder.validation';
import { FolderController } from './folder.controller';


const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);


router.post('/create', ValidateRequest(ForlderValidation.FolderValidationSchema), FolderController.createFolder);


export const FolderRoutes = router;