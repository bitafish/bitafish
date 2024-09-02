import { Order } from '@bitafish/shared-types';

import { IOrderService } from '../interface/order/IOrderService';
import { OrderRepository } from '../repositories/order.repository';
import { OrderItemService } from './order-item.service';

import { CreateOrderInput, UpdateOrderInput } from '../schemas/orders.schema';
import { APIError } from '../utils/error';

export class OrderService implements IOrderService {
  private repository: OrderRepository;
  private orderItemService: OrderItemService;

  constructor(
    _repository: OrderRepository,
    orderItemService: OrderItemService
  ) {
    this.repository = _repository;
    this.orderItemService = orderItemService;
  }

  async getOrders(limit: number, offset: number): Promise<Order[]> {
    const orders = await this.repository.find(limit, offset);
    return orders;
  }

  async createOrder({
    userId,
    shippingAddress,
    orderItems,
  }: CreateOrderInput): Promise<Order> {
    const total = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const newOrder = await this.repository.create({
      userId,
      shippingAddress,
      totalPrice: total,
    });

    if (!newOrder) {
      throw new APIError(
        'There was an error creating your order. Please try again later!'
      );
    }

    const orderItemsWithOrderId = orderItems.map((item) => ({
      ...item,
      orderId: newOrder.id,
      productId: item.productId,
      price: item.price,
      quantity: item.quantity,
    }));

    await this.orderItemService.createOrderItems(orderItemsWithOrderId);

    return newOrder;
  }

  async updateOrder(orderId: string, data: UpdateOrderInput) {
    const updatedOrder = await this.repository.update(orderId, data);
    return updatedOrder;
  }

  async deleteOrder(orderId: string) {
    const updatedOrder = await this.repository.delete(orderId);
    return updatedOrder;
  }
}
