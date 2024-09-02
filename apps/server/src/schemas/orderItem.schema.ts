import { object, string, number, TypeOf } from 'zod';

export const createOrderItemSchema = object({
  orderId: string({ required_error: 'Order Id is required' }),
  productId: string({ required_error: 'Product Id is required' }),
  price: number({ required_error: 'Product Price is required' }).min(0, {
    message: 'Product Price must be at least 0',
  }),
  quantity: number({ required_error: 'Quantity is required' }).min(1, {
    message: 'Quantity must be at least 1',
  }),
});

export type CreateOrderItemInput = TypeOf<typeof createOrderItemSchema>;
