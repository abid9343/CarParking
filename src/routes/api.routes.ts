import { Router } from 'express';
const router = Router();
//#region "=========================  Import Controllers ====================================="

import { AirPortController } from '../controllers/airPort/airPortController';
import { CompanyController } from '../controllers/company/companyController';
import { DiscountController } from '../controllers/discount/discountController';

//#endregion "========================END============================"
//#region "=========================  Controller Objects ====================================="
const advertsPostController = new AirPortController();
const discountController = new DiscountController();
//#endregion "========================END============================"

//#region "========================= webpageController ====================================="

//#endregion "========================END============================"
//#region "========================= advertsPostController ====================================="

// router.get('/post_details', advertsPostController.Post_Details);
// router.get('/post_details_v2', advertsPostController.Post_Details_V2);
// router.get('/post_details_video', advertsPostController.Post_Details_Video);
// router.post('/create_post', advertsPostController.Create_Post);

//#endregion "========================END============================"
//#region "========================= discountController ====================================="
router.put('/UpdateDiscount', discountController.UpdateDiscount);
router.post('/CreateDiscount', discountController.CreateDiscount);
router.get('/DiscountDetails', discountController.DiscountDetails);
//#endregion "========================END============================"

export default router;
