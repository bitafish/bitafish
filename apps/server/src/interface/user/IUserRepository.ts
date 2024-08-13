import { User } from '@bitafish/shared-types';
import { CreateUserInput } from '../../schemas/user.schema';

export interface IUserRepository {
  create(data: CreateUserInput): Promise<User>;
  find(limit: number, offset: number): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
