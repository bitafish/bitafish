import { CreateOrderItemInput, OrderItem } from '@bitafish/shared-types';
import { IOrderItemService } from '../interface/order-item/IOrderItemService';
import { OrderItemRepository } from '../repositories/order-item.repository';

export class OrderItemService implements IOrderItemService {
  private repository: OrderItemRepository;

  constructor(_repository: OrderItemRepository) {
    this.repository = _repository;
  }

  async createOrderItems(data: CreateOrderItemInput[]): Promise<OrderItem[]> {
    const newOrderItems = await this.repository.createMany(data);
    return newOrderItems;
  }
}
