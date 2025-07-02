
import  express, { NextFunction, Request, Response }  from 'express';
import ValidateRequest from '../../middlewares/validateRequests';
import { ImportFileController } from './ImportFile.controller';
import { upload } from '../../utils/uploadImageToCloudinary';
import { FileValidation } from './ImportFile.validation';





const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);


router.post(
  '/file',
  upload.single('file'),
  (req:Request, res:Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(FileValidation.FileValidationSchema),
  ImportFileController.createImage,
);
router.post('/copy-duplicate/:id', ImportFileController.cpoyOrDuplicate);

router.patch('/favourite/:id', ImportFileController.makeFavourite);
router.patch('/un-favourite/:id', ImportFileController.makeFavourite);
router.delete('/delete/:id', ImportFileController.deleteData);
router.patch('/rename/:id', ValidateRequest(FileValidation.FileUpdateValidationSchema), ImportFileController.updateData);

router.get('/image', ImportFileController.getAllImage);
router.get('/pdf', ImportFileController.getAllPdf);

router.get('/recent-items', ImportFileController.getAllRecentItems);






export const ImportRoutes = router;