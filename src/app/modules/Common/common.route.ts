
import  express  from 'express';
import { CommonController } from './common.controller';




const router = express.Router();


router.get('/byCalander', CommonController.getAllItemsByCalender);
router.get('/favourite', CommonController.getAllFavouriteItems);
router.patch('/un-favourite/:id', CommonController.makeAnItemUnFavourite);

export const commonRoutes = router;