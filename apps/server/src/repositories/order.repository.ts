import { Order } from '@bitafish/shared-types';
import { IOrderRepository } from '../interface/order/IOrderRepository';
import { CreateOrderInput, UpdateOrderInput } from '../schemas/orders.schema';
import { PrismaClient } from '@prisma/client';

export class OrderRepository implements IOrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(limit: number, offset: number): Promise<Order[]> {
    return await this.prisma.order.findMany({
      take: limit,
      skip: limit * offset,
      include: {
        orderItems: true,
      },
    });
  }

  async create({
    userId,
    shippingAddress,
    totalPrice,
  }: CreateOrderInput): Promise<Order> {
    return await this.prisma.order.create({
      data: {
        userId,
        shippingAddress,
        totalPrice,
      },
    });
  }

  async update(orderId: string, data: UpdateOrderInput): Promise<Order> {
    return await this.prisma.order.update({
      where: { id: orderId },
      data,
    });
  }

  async delete(orderId: string): Promise<Order> {
    return await this.prisma.order.delete({ where: { id: orderId } });
  }
}
