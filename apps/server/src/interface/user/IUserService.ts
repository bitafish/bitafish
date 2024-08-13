import { User } from '@bitafish/shared-types';

export interface IUserService {
  getUsers(limit: number, offset: number): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  createUser(data: User): Promise<User>;
}
