import { Request, Response, NextFunction } from 'express';
import { DiscountManager } from '../../managerLayers/discountManager/discountManagerLayer';
import { RequestLogger } from '../../handlers/logger/loggerHandler';
import {
  dbError,
  insufficientParameters,
  internalServerError,
  successResponse,
} from '../../handlers/response/responseHandler';
import { DiscountDTO } from '../../models/classes/index';
const BALayer = DiscountManager.getInstance();

export class DiscountController {
  DiscountDetails = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id: number = Number(request.body.id || 0);
      
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'DiscountDetails';
      RequestLogger(apiNameLogs, '');
      // #endregion "=====================END============================"
       //#region "===============BAL=========================="
      await BALayer.DiscountDetails(id)
        .then((data) => {
          successResponse(
            'get Discount details successfull',
            data,
            response
          );
        })
        .catch((error) => {
          return dbError(error, response);
        });
      // #endregion "=====================END============================"
    } catch (error) {
      internalServerError('', error, response);
    }
  };
  CreateDiscount = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'CreateDiscount';

      const body = new DiscountDTO(request.body);
      RequestLogger(apiNameLogs, body);
      // #endregion "=====================END============================"

      //#region "===============VALIDATION=========================="
      if (body.code == undefined || body.code == '') {
        return insufficientParameters('code must be required!', response);
      }
      if (body.discount == undefined || body.discount == '') {
        return insufficientParameters('discount must be required!', response);
      }

      // #endregion "=====================END============================"
      //#region "===============BAL=========================="

      await BALayer.CreateDiscount(body)
        .then((data) => {
          return successResponse(
            'create Discount successfull',
            data,
            response
          );
        })
        .catch((error) => {
          return dbError(error, response);
        });
      // #endregion "=====================END============================"
    } catch (error) {
      internalServerError('', error, response);
    }
  };
  UpdateDiscount = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'UpdateDiscount';
     
      const body = new DiscountDTO(request.body);
      RequestLogger(apiNameLogs, body);
      // #endregion "=====================END============================"

      //#region "===============VALIDATION=========================="
      if (body.id == undefined || body.id == 0) {
        return insufficientParameters('id must be required!', response);
      }
      

      // #endregion "=====================END============================"
      //#region "===============BAL=========================="

      await BALayer.UpdateDiscount(body)
        .then((data) => {
          return successResponse(
            'update Discount successfull',
            data,
            response
          );
        })
        .catch((error) => {
          return dbError(error, response);
        });
      // #endregion "=====================END============================"
    } catch (error) {
      internalServerError('', error, response);
    }
  };
  DeleteDiscount = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id: number = Number(request.body.id || 0);
      
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'DeleteDiscount';
      RequestLogger(apiNameLogs, '');
      // #endregion "=====================END============================"
       //#region "===============BAL=========================="
      await BALayer.DeleteDiscount(id)
        .then((data) => {
          successResponse(
            'delte Discount details successfull',
            data,
            response
          );
        })
        .catch((error) => {
          return dbError(error, response);
        });
      // #endregion "=====================END============================"
    } catch (error) {
      internalServerError('', error, response);
    }
  };
  //#endregion "end"
}
