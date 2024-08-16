import { Review, ReviewQuery } from '@bitafish/shared-types';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../../schemas/reviews.schema';

export interface IReviewsService {
  getReviews(
    where: ReviewQuery,
    limit: number,
    offset: number
  ): Promise<Review | Review[]>;
  createReview(data: CreateReviewInput): Promise<Review>;
  updateReview(reviewId: string, data: UpdateReviewInput): Promise<Review>;
  deleteReview(reviewId: string): Promise<Review>;
}
