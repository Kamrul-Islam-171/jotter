
import  express, { NextFunction, Request, Response }  from 'express';
import ValidateRequest from '../../middlewares/validateRequests';
import { ImportFileController } from './ImportFile.controller';
import { upload } from '../../utils/uploadImageToCloudinary';
import { FileValidation } from './ImportFile.validation';




const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);


router.post(
  '/image',
  upload.single('file'),
  (req:Request, res:Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ValidateRequest(FileValidation.FileValidationSchema),
  ImportFileController.createImage,
);
// router.post(
//   '/pdf',
//   upload.single('file'),
//   (req:Request, res:Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   ValidateRequest(FileValidation.FileValidationSchema),
//   ImportFileController.createPdf,
// );






export const ImportRoutes = router;