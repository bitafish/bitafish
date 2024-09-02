import { Order } from '@bitafish/shared-types';
import {
  CreateOrderInput,
  UpdateOrderInput,
} from '../../schemas/orders.schema';

export interface IOrderService {
  getOrders(limit: number, offset: number): Promise<Order[]>;
  createOrder(data: CreateOrderInput): Promise<Order>;
  updateOrder(orderId: string, data: UpdateOrderInput): Promise<Order>;
  deleteOrder(orderId: string): Promise<Order>;
}
