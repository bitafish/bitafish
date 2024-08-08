import { User } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../interface/IUserRepository';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findOne(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
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
