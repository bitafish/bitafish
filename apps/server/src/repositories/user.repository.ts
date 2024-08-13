import { User } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../interface/user/IUserRepository';
import { CreateUserInput } from '../schemas/user.schema';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(limit: number, offset: number) {
    return await this.prisma.user.findMany({
      take: limit,
      skip: offset,
    });
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
  }: CreateUserInput): Promise<User> {
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
