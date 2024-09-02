import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import { User } from '@bitafish/shared-types';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']) | 10;
      const offset = Number(req.query['offset']) | 0;
      const users = await this.service.getUsers(limit, offset);

      return res.status(200).json({
        status: 'success',
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMeHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | null = res.locals?.user;
      const userData = await this.service.getMe(user?.id);

      return res.status(200).json({
        status: 'success',
        data: {
          user: userData,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateUserInput>req.body;
      const user = await this.service.createUser(body);

      return res.status(201).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <UpdateUserInput>req.body;
      const userId: string = req.params.id;

      const updatedUser = await this.service.updateUser(userId, body);

      return res.status(200).json({
        status: 'success',
        data: { user: updatedUser },
      });
    } catch (error) {
      next(error);
    }
  }

  async onDeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const deletedUser = await this.service.deleteUser(userId);

      return res.status(200).json({
        status: 'success',
        data: { id: deletedUser.id },
      });
    } catch (error) {
      next(error);
    }
  }
}
