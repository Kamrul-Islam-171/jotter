
import  express  from 'express';
import ValidateRequest from '../../middlewares/validateRequests';
import { NoteValidation } from './note.validation';
import { NoteController } from './note.controller';



const router = express.Router();

// router.post('/create-user', ValidateRequest(UserValidation.createUserValidation), UserController.createUser);

router.post('/copy-duplicate/:id', NoteController.cpoyOrDuplicate);
router.post('/create', ValidateRequest(NoteValidation.NoteValidationSchema), NoteController.createNote);
router.patch('/favourite/:id', NoteController.makeFavourite);
router.patch('/un-favourite/:id', NoteController.makeFavourite);
router.delete('/delete/:id', NoteController.deleteData);
router.patch('/rename/:id',ValidateRequest(NoteValidation.NoteUpdateValidationSchema), NoteController.updateData);
router.get('/', NoteController.getAllNote)

export const NoteRoutes = router;