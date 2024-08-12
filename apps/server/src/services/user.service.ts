import { User } from '@bitafish/shared-types';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from '../interface/user/IUserService';

import { NotFoundError } from '../utils/error';

export class UserService implements IUserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async findUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('No User with this email found.');
    }

    return user;
  }

  async createUser(data: User) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new NotFoundError('User with this email already exists.');
    }

    return await this.repository.create(data);
  }
}
