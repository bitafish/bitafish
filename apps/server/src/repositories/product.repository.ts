import { Product } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IProductRepository } from './../interface/product/IProductRepository';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../schemas/product.schema';

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(limit = 10, offset = 0) {
    // Ensure the limit and offset are positive integers
    const validLimit = Math.max(Number(limit) || 10, 1);
    const validOffset = Math.max(Number(offset) || 0, 0);

    return await this.prisma.product.findMany({
      skip: validOffset,
      take: validLimit,
    });
  }
   async findById(id: string): Promise<Product> {
     return await this.prisma.product.findUnique({
       where: { id },
     });
   }

  async create({
    name,
    price,
    description,
    CategoryId,
    images,
    stock,
  }: CreateProductInput): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        name,
        price,
        description,
        CategoryId,
        images,
        stock,
      },
      include: {
        category: true,  // Include the related Category
      },
    });
  }
  async update(
    id: string,
    {name, price, description, CategoryId, images, stock}: UpdateProductInput
  ) {
    return await this.prisma.product.update({
      where: {id},
      data: {
        name,
        price,
        description,
        CategoryId,
        images: Array.isArray(images) ? images : [images],
        stock,
      },
    })
  }

  async delete(productId: string) {
    return await this.prisma.product.delete({
      where: {id: productId}
    });
  }
}
