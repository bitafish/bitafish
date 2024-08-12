import { User } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../interface/user/IUserRepository';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create({
    firstName,
    lastName,
    email,
    password,
    role,
  }: User): Promise<User> {
    return await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
      },
    });
  }
}
