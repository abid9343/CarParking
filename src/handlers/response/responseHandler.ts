import { Response } from 'express';
import { ResponseStatusCodes } from '../../libraries/enum/eum';

export function successResponse(message: string, data: any, res: Response) {
  res.status(ResponseStatusCodes.success).json({
    status_code: 200,
    is_success: true,
    message: message,
    data,
  });
}

export function failureResponse(message: string, data: any, res: Response) {
  res.status(ResponseStatusCodes.success).json({
    status_code: 500,
    is_success: true,
    message: message,
    data,
  });
}

export function insufficientParameters(data: any, res: Response) {
  res.status(ResponseStatusCodes.bad_request).json({
    status_code: 400,
    is_success: false,
    message: 'Insufficient parameters',
    data,
  });
}
export function internalServerError(message: string, err: any, res: Response) {
  res.status(ResponseStatusCodes.internal_server_error).json({
    status_code: 500,
    is_success: false,
    message: message,
    data: err,
  });
}
export function dbError(err: any, res: Response) {
  res.status(ResponseStatusCodes.internal_server_error).json({
    status_code: 500,
    is_success: false,
    message: 'Mysql_db error',
    data: err,
  });
}
