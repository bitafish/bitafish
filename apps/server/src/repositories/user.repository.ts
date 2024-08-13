import { User } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../interface/user/IUserRepository';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';

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

  async update(
    id: string,
    { firstName, lastName, isEmailVerified, image }: UpdateUserInput
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        isEmailVerified,
        image,
      },
    });
  }

  async delete(userId: string) {
    return await this.prisma.user.delete({ where: { id: userId } });
  }
}
