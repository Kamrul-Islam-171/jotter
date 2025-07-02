
import  express  from 'express';
import ValidateRequest from '../../middlewares/validateRequests';
import { ForlderValidation } from './folder.validation';
import { FolderController } from './folder.controller';


const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);

router.post('/copy-duplicate/:id', FolderController.copyOrDuplicate);
router.post('/create', ValidateRequest(ForlderValidation.FolderValidationSchema), FolderController.createFolder);
router.patch('/favourite/:id', FolderController.makeFavourite);
router.patch('/un-favourite/:id', FolderController.makeUnFavourite);
router.patch('/rename/:id',ValidateRequest(ForlderValidation.FolderUpdateValidationSchema), FolderController.upDateData);
router.delete('/delete/:id',FolderController.deleteData);
router.get('/', FolderController.getAllFolder);

export const FolderRoutes = router;