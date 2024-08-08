import { User } from '@bitafish/shared-types';

export interface IUserService {
  createUser(data: User): Promise<User>;
}
