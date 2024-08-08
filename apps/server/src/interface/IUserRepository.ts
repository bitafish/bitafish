import { User } from '@bitafish/shared-types';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findOne(email: string): Promise<User>;
}
