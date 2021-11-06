import { Request, Response, NextFunction } from 'express';
import { AirPortManager } from '../../managerLayers/airPortManager/airPortManagerLayer';
import { RequestLogger } from '../../handlers/logger/loggerHandler';
import {
  dbError,
  insufficientParameters,
  internalServerError,
  successResponse,
} from '../../handlers/response/responseHandler';
import { AirPortDTO } from '../../models/classes/index';
const BALayer = AirPortManager.getInstance();
// first comment on my system
export class AirPortController {
  AirportDetails = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id: number = Number(request.body.id || 0);
      
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'AirportDetails';
      RequestLogger(apiNameLogs, '');
      // #endregion "=====================END============================"
       //#region "===============BAL=========================="
      await BALayer.AirportDetails(id)
        .then((data) => {
          successResponse(
            'get airPort details successfull',
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
  CreateAirport = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'CreateAirport';

      const body = new AirPortDTO(request.body);
      RequestLogger(apiNameLogs, body);
      // #endregion "=====================END============================"

      //#region "===============VALIDATION=========================="
      if (body.name == undefined || body.name == '') {
        return insufficientParameters('name must be required!', response);
      }
      

      // #endregion "=====================END============================"
      //#region "===============BAL=========================="

      await BALayer.CreateAirport(body)
        .then((data) => {
          return successResponse(
            'create airPort successfull',
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
  UpdateAirPort = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'UpdateAirPort';
     
      const body = new AirPortDTO(request.body);
      RequestLogger(apiNameLogs, body);
      // #endregion "=====================END============================"

      //#region "===============VALIDATION=========================="
      if (body.id == undefined || body.id == 0) {
        return insufficientParameters('id must be required!', response);
      }
      

      // #endregion "=====================END============================"
      //#region "===============BAL=========================="

      await BALayer.UpdateAirPort(body)
        .then((data) => {
          return successResponse(
            'update airPort successfull',
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
  DeleteAirPort = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id: number = Number(request.body.id || 0);
      
      //#region "===============LOGS PRINTS=========================="
      const apiNameLogs = 'DeleteAirPort';
      RequestLogger(apiNameLogs, '');
      // #endregion "=====================END============================"
       //#region "===============BAL=========================="
      await BALayer.DeleteAirPort(id)
        .then((data) => {
          successResponse(
            'delte airPort details successfull',
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
