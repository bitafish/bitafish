import { OrderStatus } from '@prisma/client';
import { array, number, object, string, TypeOf, z } from 'zod';

import { createOrderItemSchema } from '../schemas/orderItem.schema';

export const createOrderSchema = object({
  body: object({
    userId: string({
      required_error: 'User Id is required',
    }),
    totalPrice: number({
      required_error: 'Total Price is required',
    }).min(0, { message: 'Total Price must be at least 0' }),
    shippingAddress: string({
      required_error: 'Shipping Address is required',
    }),
    orderItems: array(createOrderItemSchema, {
      required_error: 'Order Items is required in order to place your order',
    }),
  }),
});

export const updateOrderSchema = object({
  body: object({
    shippingAddress: z.string().optional(),
    status: z
      .optional(z.nativeEnum(OrderStatus))
      .refine((value) => value !== undefined, {
        message: 'Order status should have a valid value',
      }),
  }),
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>['body'];
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>['body'];
