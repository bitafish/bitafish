import { NextFunction, Request, Response } from 'express';
import { AuthorizeError } from '../utils/error';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      new AuthorizeError("Session has expired or user doesn't exist");
    }

    next();
  } catch (err) {
    next(err);
  }
};
