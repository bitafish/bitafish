import { Review, ReviewQuery } from '@bitafish/shared-types';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../../schemas/reviews.schema';

export interface IReviewsRepository {
  findAll(limit: number, offset: number): Promise<Review[]>;
  find(
    where: ReviewQuery,
    limit: number,
    offset: number
  ): Promise<Review | Review[]>;
  create(data: CreateReviewInput): Promise<Review>;
  update(id: string, data: UpdateReviewInput): Promise<Review>;
  delete(reviewId: string): Promise<Review>;
}
