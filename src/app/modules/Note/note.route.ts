
import  express  from 'express';
import ValidateRequest from '../../middlewares/validateRequests';
import { NoteValidation } from './note.validation';
import { NoteController } from './note.controller';



const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);


router.post('/create', ValidateRequest(NoteValidation.NoteValidationSchema), NoteController.createNote);


export const NoteRoutes = router;