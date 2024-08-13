import { Request, Response, NextFunction } from 'express';

import { UserRepository } from '../repositories/user.repository';

import { AuthorizeError } from '../utils/error';
import { verifyJwt } from '../utils/jwt';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      throw new AuthorizeError('You are not logged in');
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'accessTokenPublicKey'
    );

    if (!decoded) {
      throw new AuthorizeError("Invalid token or user doesn't exist");
    }

    // Check if the user still exist
    const userRepository = new UserRepository();
    const user = await userRepository.findById(decoded.sub);

    if (!user) {
      throw new AuthorizeError('Invalid token or session has expired');
    }

    // Add user to res.locals
    res.locals.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
