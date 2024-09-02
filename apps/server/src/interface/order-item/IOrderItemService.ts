import { CreateOrderItemInput, OrderItem } from '@bitafish/shared-types';

export interface IOrderItemService {
  createOrderItems(data: CreateOrderItemInput[]): Promise<OrderItem[]>;
}
