import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './../schemas/category.schema';

import { Category } from '@bitafish/shared-types';

import { PrismaClient } from '@prisma/client';

import { ICategoryRepository } from '../interface/category/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async find(limit = 10, offset = 0) {
    // Ensure the limit and offset are positive integers
    const validLimit = Math.max(Number(limit) || 5, 1);
    const validOffset = Math.max(Number(offset) || 0, 0);

    return await this.prisma.category.findMany({
      skip: validOffset,
      take: validLimit,
    });
  }

  async findById(id: string): Promise<Category> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async create({ name }: CreateCategoryInput): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        name,
      },
    });
  }
  async update(id: string, { name }: UpdateCategoryInput) {
    return await this.prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async delete(CategoryId: string) {
    return await this.prisma.category.delete({ where: { id: CategoryId } });
  }
}
