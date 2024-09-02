import { number, object, string, TypeOf, z } from 'zod';

export const createReviewSchema = object({
  body: object({
    userId: string({
      required_error: 'User Id is required',
    }),
    productId: string({
      required_error: 'Product Id is required',
    }),
    stars: number({
      required_error: 'Stars are required',
    }),
  }),
});

export const updateReviewSchema = object({
  body: object({
    stars: z.number().optional(),
  }),
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>['body'];

export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>['body'];
