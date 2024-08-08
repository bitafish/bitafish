import { User } from '@bitafish/shared-types';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from '../interface/IUserService';

import { NotFoundError } from '../utils/error';

export class UserService implements IUserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async createUser(data: User) {
    const existingUser = await this.repository.findOne(data.email);

    if (existingUser) {
      throw new NotFoundError('User with this email already exists.');
    }

    return await this.repository.create(data);
  }
}
