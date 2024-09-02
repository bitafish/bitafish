import { OrderItem, CreateOrderItemInput } from '@bitafish/shared-types';

export interface IOrderItemRepository {
  createMany(data: CreateOrderItemInput[]): Promise<OrderItem[]>;
}
