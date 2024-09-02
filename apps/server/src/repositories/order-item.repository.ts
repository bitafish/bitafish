import { CreateOrderItemInput, OrderItem } from '@bitafish/shared-types';
import { PrismaClient } from '@prisma/client';

import { IOrderItemRepository } from '../interface/order-item/IOrderItemRepository';

export class OrderItemRepository implements IOrderItemRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createMany(data: CreateOrderItemInput[]): Promise<OrderItem[]> {
    return await this.prisma.orderItem.createManyAndReturn({
      data,
    });
  }
}
