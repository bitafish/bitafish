import { NextFunction, Request, Response } from 'express';

import { NotFoundError, ValidationError, AuthorizeError } from './errors';
import { logger } from '../logger';

export const HandleErrorWithLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let reportError = true;
  let status = 500;
  let data = error.message;

  // skip common / known errors
  [NotFoundError, ValidationError, AuthorizeError].forEach((typeOfError) => {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      data = error.message;
    }
  });

  if (reportError) {
    logger.error(error);
  } else {
    logger.warn(error); // ignore common errors caused by user
  }

  if (res.headersSent) {
    return next(error); 
  }

  return res.status(status).json(data);
};
