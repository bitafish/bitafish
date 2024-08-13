import { UserRepository } from '../repositories/user.repository';
import { IUserService } from '../interface/user/IUserService';

import { NotFoundError } from '../utils/error';
import { CreateUserInput } from '../schemas/user.schema';

export class UserService implements IUserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getUsers(limit: number, offset: number) {
    return await this.repository.find(limit, offset);
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('No User with this email found.');
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('No User with this email found.');
    }

    return user;
  }

  async createUser({
    firstName,
    lastName,
    email,
    password,
    role,
  }: CreateUserInput) {
    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new NotFoundError('User with this email already exists.');
    }

    return await this.repository.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
  }
}
