import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '@bitafish/shared-types';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../utils/jwt';

export class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor(authService: AuthService, userService: UserService) {
    this.userService = userService;
    this.authService = authService;
  }

  async onRegisterUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateUserInput>req.body;

      const hashedPassword: string = await bcrypt.hash(body.password, 12);
      const userData = {
        ...body,
        password: hashedPassword,
      } as User;
      const user = await this.userService.createUser(userData);

      return res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async onLoginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = <LoginUserInput>req.body;
      const { access_token, refresh_token } = await this.authService.loginUser(
        email,
        password
      );

      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          access_token,
          refresh_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onRefreshAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refresh_token = req.cookies?.refresh_token;

      const access_token: string = await this.authService.refreshToken(
        refresh_token
      );

      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  logout(res: Response) {
    res.cookie('access_token', '', { maxAge: -1 });
    res.cookie('refresh_token', '', { maxAge: -1 });
    res.cookie('logged_in', '', { maxAge: -1 });
  }

  async onLogout(req: Request, res: Response, next: NextFunction) {
    try {
      this.logout(res);

      return res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}
