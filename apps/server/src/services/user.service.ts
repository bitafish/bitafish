import { UserRepository } from '../repositories/user.repository';
import { IUserService } from '../interface/user/IUserService';

import { AuthorizeError, NotFoundError } from '../utils/error';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';

export class UserService implements IUserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getUsers(limit: number, offset: number) {
    return await this.repository.find(limit, offset);
  }

  async getMe(userId: string) {
    if (!userId) {
      throw new AuthorizeError('You are not logged in.');
    }

    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundError('No User with this id found.');
    }

    return user;
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

  async updateUser(
    userId: string,
    { firstName, lastName, isEmailVerified, image }: UpdateUserInput
  ) {
    const existingUser = await this.repository.findById(userId);

    if (!existingUser) {
      throw new NotFoundError('No User with this id found.');
    }

    return await this.repository.update(userId, {
      firstName,
      lastName,
      isEmailVerified,
      image,
    });
  }

  async deleteUser(userId: string) {
    const existingUser = await this.repository.findById(userId);

    if (!existingUser) {
      throw new NotFoundError('No User with this id found.');
    }

    return await this.repository.delete(userId);
  }
}
