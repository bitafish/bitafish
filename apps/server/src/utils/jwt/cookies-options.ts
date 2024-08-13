import { CookieOptions } from 'express';
import config from '../../config';

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

export const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.jwt.accessTokenExpiresIn * 60 * 1000),
  maxAge: config.jwt.accessTokenExpiresIn * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.jwt.refreshTokenExpiresIn * 60 * 1000),
  maxAge: config.jwt.refreshTokenExpiresIn * 60 * 1000,
};
