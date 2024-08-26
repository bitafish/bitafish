
import { number, object, string, TypeOf, z } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    price: number({
      required_error: 'The price is required',
    }),
    description: string({
      required_error: 'A Description is required',
    }),
    CategoryId: string({
      required_error: 'The Category of the product is required',
    }),
    images: z.array(z.string()).nonempty({
      message: 'An image of the product is required',
    }),
    stock: number()
      .refine((value) => Number.isInteger(value), {
        message: 'Stock must be an integer',
      })
      .optional(),
  }),
});

export const updateProductSchema = object({
  body: object({
    name: string().optional(),
    price: number().optional(),
    description: string().optional(),
    CategoryId: string().optional(),
    images: string().optional(),
    stock: number()
      .refine((value) => Number.isInteger(value), {
        message: 'Stock must be an integer',
      })
      .optional(),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];

export type UpdateProductInput = TypeOf<typeof updateProductSchema>['body'];
