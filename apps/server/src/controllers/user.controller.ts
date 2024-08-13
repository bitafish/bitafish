import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateUserInput>req.body;
      const user = await this.service.createUser(body);

      return res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']);
      const offset = Number(req.query['offset']);
      const users = await this.service.getUsers(limit, offset);

      return res.status(200).json({
        status: 'success',
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  }
}
