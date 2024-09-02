import { Review, ReviewQuery } from '@bitafish/shared-types';
import { IReviewsService } from '../interface/review/IReviewsService';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../schemas/reviews.schema';
import { ReviewsRepository } from '../repositories/reviews.repository';
import { NotFoundError } from '../utils/error';

export class ReviewsService implements IReviewsService {
  private repository: ReviewsRepository;

  constructor(_repository: ReviewsRepository) {
    this.repository = _repository;
  }

  async getReviews(
    where: ReviewQuery,
    limit: number,
    offset: number
  ): Promise<Review | Review[]> {
    const reviews = await this.repository.find(where, limit, offset);

    return reviews;
  }

  async createReview({
    userId,
    productId,
    stars,
  }: CreateReviewInput): Promise<Review> {
    // TO-DO: CHECK IF PRODUCT EXISTS
    if (!productId) {
      throw new NotFoundError('Product with this id not found');
    }

    // TO-DO: CHECK IF USER EXISTS
    if (!userId) {
      throw new NotFoundError('User with this id not found');
    }

    const review = await this.repository.create({ userId, productId, stars });
    return review;
  }

  async updateReview(
    reviewId: string,
    { stars }: UpdateReviewInput
  ): Promise<Review> {
    if (!reviewId) {
      throw new NotFoundError('Review with this id not found');
    }

    const updatedReview = await this.repository.update(reviewId, { stars });
    return updatedReview;
  }

  async deleteReview(reviewId: string): Promise<Review> {
    if (!reviewId) {
      throw new NotFoundError('Review with this id not found');
    }

    return await this.repository.delete(reviewId);
  }
}
