import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async onCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const data = await this.service.createUser(body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
