import { User } from '@bitafish/shared-types';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
