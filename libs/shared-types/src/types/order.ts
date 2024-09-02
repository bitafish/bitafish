import { OrderStatus } from '@prisma/client';
import { OrderItem } from './order-item';

export interface Order {
  id: string;
  userId: string;
  totalPrice: number;
  shippingAddress: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  orderItems?: OrderItem[];
}
