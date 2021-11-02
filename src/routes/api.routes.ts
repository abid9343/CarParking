import { Router } from 'express';
const router = Router();
//#region "=========================  Import Controllers ====================================="

import { AirPortController } from '../controllers/airPort/airPortController';


//#endregion "========================END============================"
//#region "=========================  Controller Objects ====================================="
const advertsPostController = new AirPortController();


//#endregion "========================END============================"

//#region "========================= webpageController ====================================="




//#endregion "========================END============================"
//#region "========================= advertsPostController ====================================="

// router.get('/post_details', advertsPostController.Post_Details);
// router.get('/post_details_v2', advertsPostController.Post_Details_V2);
// router.get('/post_details_video', advertsPostController.Post_Details_Video);
// router.post('/create_post', advertsPostController.Create_Post);

//#endregion "========================END============================"
//#region "========================= advertsCommentController ====================================="


//#endregion "========================END============================"



export default router;
