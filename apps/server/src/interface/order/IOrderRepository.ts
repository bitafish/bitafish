import { Order } from '@bitafish/shared-types';
import {
  CreateOrderInput,
  UpdateOrderInput,
} from '../../schemas/orders.schema';

export interface IOrderRepository {
  find(limit: number, offset: number): Promise<Order[]>;
  create(data: CreateOrderInput): Promise<Order>;
  update(orderId: string, data: UpdateOrderInput): Promise<Order>;
  delete(orderId: string): Promise<Order>;
}
