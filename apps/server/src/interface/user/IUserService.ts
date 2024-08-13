import { User } from '@bitafish/shared-types';
import { CreateUserInput, UpdateUserInput } from '../../schemas/user.schema';

export interface IUserService {
  getUsers(limit: number, offset: number): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(userId: string, data: UpdateUserInput): Promise<User>;
  deleteUser(userId: string): Promise<User>;
}
